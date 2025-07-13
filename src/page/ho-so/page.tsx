import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Stack,
} from "@mui/material";
import {
  Person,
  CreditCard,
  AccountBalance,
  Logout,
} from "@mui/icons-material";
import clsx from "clsx";
import { safeParseJSON } from "@/helpers";
import { User } from "@/services/model/user";
import {
  ApolloQueryResult,
  OperationVariables,
  useQuery,
} from "@apollo/client";
import Cookies from "js-cookie";
import { GET_USER } from "@/services/graphql/user-gql";
import PersonalInfoPanelSkeleton from "./components/SkeletonProfile";
import { ArrowLeftRight, Lock } from "lucide-react";
import { InfoUser } from "./components/info";
import LoanListSection from "./components/LoanList";
import BankAccountInfoSection from "./components/BankAccount";
import ChangePasswordAndLoginHistory from "./components/bao-mat-tk";
import { GET_LOAN_USER } from "@/services/graphql/loans-gql";
import { Loan } from "@/services/model/loans";
import { useSearchParams } from "react-router-dom";
import { useRouter } from "@/hook";
import AccountHistorySection from "./components/bien-dong-so-du";
import { toast } from "sonner";
import { PUBLIC_ROUTER } from "@/router/section";
import { USER_INFO } from "@/contants/contants";
import Alert from "@mui/material/Alert";

export default function UserProfileLayout() {
  const [selected, setSelected] = useState(1);
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const router = useRouter();

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
      { label: "Thông báo", icon: <ArrowLeftRight />, key: 5 },
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
  const menuItemsMobile = useMemo(() => {
    const showInfoBank =
      !!user?.accountname && !!user?.accountnumber && !!user?.bankname;
    const showLoanList = !!dataLoanUser?.loans?.[0]?.id;

    const data = [{ label: "Tài khoản", icon: <Person />, key: 1 }];

    if (showLoanList) {
      data.push({ label: "Hợp đồng", icon: <CreditCard />, key: 2 });
    }

    if (showInfoBank) {
      data.push({
        label: "Khoản vay",
        icon: <AccountBalance />,
        key: 3,
      });
    }
    data.push({ label: "Ngân hàng", icon: <AccountBalance />, key: 4 });
    data.push({
      label: "Thông báo",
      icon: <ArrowLeftRight />,
      key: 5,
    });
    data.push({ label: "Đăng xuất", icon: <Logout />, key: 6 });
    return data;
  }, [user, dataLoanUser?.loans?.[0]?.id]);

  const renderContent = () => {
    console.log("selected", selected);

    switch (selected) {
      case 2: // Hợp đồng
        return <LoanListSection list={dataLoanUser?.loans} />;
      case 3: // Khoản vay
        return <BankAccountInfoSection user={user} />;
      case 4: // Ngân hàng
        return <ChangePasswordAndLoginHistory />;
      case 5: // Thông báo
        return <AccountHistorySection user={user} />;
      default:
        return (
          <InfoUser
            user={user}
            setSelected={setSelected}
            loanCurrent={dataLoanUser?.loans?.[0]}
          />
        );
    }
  };
  const pathname = router.pathname;

  const [openProfile, setOpenProfile] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (type === "2") setValue(2);
  }, [JSON.stringify(pathname)]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelected(newValue + 1);
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

  if (!userInfo) {
    return window.location.replace("/dang-nhap");
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
        <Paper elevation={1} className="p-4 !rounded-[10px] hidden md:block">
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
            <ListItem className={clsx("rounded-lg mb-1 cursor-pointer")}>
              <ListItemIcon className={clsx("text-white")}>
                <Logout />
              </ListItemIcon>
              <ListItemText
                primary="Đăng xuất"
                onClick={() => {
                  Cookies.remove(USER_INFO);
                  Cookies.remove("access_token");
                  router.push(PUBLIC_ROUTER.ACCOUNT.LOGIN);
                  toast.success("Đăng xuất thành công");
                }}
              />
            </ListItem>
          </List>
        </Paper>

        <Paper
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 999,
            backgroundColor: "white",
            padding: "5px 0px",
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            paddingLeft: "50px",
            width: "auto",
            overflowX: "scroll",
          }}
          className="md:hidden"
        >
          <BottomNavigation
            value={selected - 1}
            onChange={handleChange}
            showLabels
          >
            {menuItemsMobile.map((menu) => (
              <BottomNavigationAction
                label={menu.label}
                icon={menu.icon}
                onClick={() => {
                  if (menu.key === 6) {
                    toast.success("Đăng xuất thành công");
                    Cookies.remove(USER_INFO);
                    Cookies.remove("access_token");
                    router.push("/dang-nhap");
                  }
                }}
                className="!w-[180px]"
              />
            ))}
          </BottomNavigation>
        </Paper>
        {renderContent()}
      </Box>
    </Box>
  );
}
