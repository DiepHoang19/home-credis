import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Button,
} from "@mui/material";
import {
  Person,
  CreditCard,
  AccountBalance,
  Logout,
} from "@mui/icons-material";
import clsx from "clsx";
import { formatNumber, safeParseJSON } from "@/helpers";
import { GET_LOANS_CONFIGS } from "@/services/graphql/loans-config-gql";
import { LoansConfig } from "@/services/model/loansconfig";
import { User } from "@/services/model/user";
import {
  ApolloQueryResult,
  OperationVariables,
  useQuery,
} from "@apollo/client";
import Cookies from "js-cookie";
import { GET_USER } from "@/services/graphql/user-gql";
import dayjs from "dayjs";
import PersonalInfoPanelSkeleton from "./components/SkeletonProfile";
import { Lock, User2Icon } from "lucide-react";
import { InfoUser } from "./components/info";
import LoanListSection from "./components/LoanList";
import BankAccountInfoSection from "./components/BankAccount";
import ChangePasswordAndLoginHistory from "./components/bao-mat-tk";
import { GET_LOAN_USER } from "@/services/graphql/loans-gql";
import { Loan } from "@/services/model/loans";
import { useSearchParams } from "react-router-dom";
import { useRouter } from "@/hook";

export default function UserProfileLayout() {
  const router = useRouter();
  const [selected, setSelected] = useState(1);
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const userInfo = safeParseJSON(
    (Cookies.get("user_info") || "") as string
  ) as User;

  const {
    data: dataUser,
    loading: loadingGetUser,
  }: { data: { users: User[] }; loading: boolean } = useQuery(GET_USER, {
    variables: { id: userInfo?.id },
    skip: !userInfo?.id,
  });

  const user = dataUser?.users?.[0];
  const {
    data: dataLoanUser,
    refetch: refetchCurrentLoan,
    loading,
  }: {
    data: { loans: Loan[] };
    refetch: (
      variables?: Partial<OperationVariables>
    ) => Promise<ApolloQueryResult<any>>;
    loading: boolean;
  } = useQuery(GET_LOAN_USER, {
    variables: {
      user_id: userInfo?.id,
    },
    skip: !userInfo?.id,
  });

  const menuItems = useMemo(() => {
    const showInfoBank =
      !!user?.accountname && !!user?.accountnumber && !!user?.bankname;
    const showLoanList = !!dataLoanUser?.loans?.[0]?.id;

    const data = [
      { label: "Thông tin cá nhân", icon: <Person />, key: 1 },
      { label: "Bảo mật tài khoản ", icon: <Lock />, key: 4 },
    ];

    if (showLoanList) {
      data.push({ label: "Hợp đồng khoản vay", icon: <CreditCard />, key: 2 });
    }

    if (showInfoBank) {
      data.push({
        label: "Thông tin ngân hàng",
        icon: <AccountBalance />,
        key: 3,
      });
    }
    return data;
  }, [user, dataLoanUser?.loans?.[0]?.id]);

  const renderContent = () => {
    switch (selected) {
      case 1:
        return <InfoUser user={user} />;
      case 2:
        return <LoanListSection list={dataLoanUser?.loans} />;
      case 3:
        return <BankAccountInfoSection user={user} />;
      case 4:
        return <ChangePasswordAndLoginHistory />;
      default:
        break;
    }
  };

  useEffect(() => {
    const num = Number(type);
    if (num) {
      setSelected(num || 1);
    }
  }, [type]);

  if (loadingGetUser) {
    return <PersonalInfoPanelSkeleton />;
  }
  return (
    <Box className="bg-[#f6f9fb] min-h-fit py-6 px-4 ">
      <Typography
        variant="h5"
        align="center"
        fontWeight="bold"
        className="text-gray-700 !mb-6"
      >
        THÔNG TIN CÁ NHÂN
      </Typography>
      <Box className="flex justify-center gap-6">
        {/* Sidebar */}
        <Paper elevation={1} className="w-xs p-4 !rounded-[10px]">
          <Box className="flex flex-col items-center gap-1 mb-4">
            <Box className="w-16 h-16 rounded-full bg-gray-300">
              <img src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid&w=740" />{" "}
            </Box>
            <Typography fontWeight="bold">{user?.full_name || ""}</Typography>
            <Typography variant="body2" color="textSecondary">
              {user?.phone_number || ""}
            </Typography>
          </Box>
          <List>
            {menuItems.map((item) => (
              <>
                <ListItem
                  key={item.label}
                  // button
                  onClick={() => setSelected(item.key)}
                  className={clsx(
                    "rounded-lg mb-1 cursor-pointer",
                    selected === item.key
                      ? "bg-red-600 text-white"
                      : "hover:bg-gray-100"
                  )}
                >
                  <ListItemIcon
                    className={clsx(selected === item.key && "text-white")}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              </>
            ))}
            <ListItem
              // button
              className={clsx("rounded-lg mb-1 cursor-pointer")}
            >
              <ListItemIcon className={clsx("text-white")}>
                <Logout />
              </ListItemIcon>
              <ListItemText
                primary="Đăng xuất"
                onClick={() => {
                  Cookies.remove("user_info");
                  Cookies.remove("access_token");
                  router.push("/");
                }}
              />
            </ListItem>
          </List>
        </Paper>

        {/* Content */}
        {renderContent()}
      </Box>
    </Box>
  );
}
