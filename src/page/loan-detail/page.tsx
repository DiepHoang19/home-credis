import { Box, Typography, Paper, Button, Modal } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import {
  CircleDollarSignIcon,
  Eye,
  Handshake,
  Settings,
  User2,
} from "lucide-react";
import { ENUM_STATUS_LOAN, Loan } from "@/services/model/loans";
import { GET_LOAN_BY_ID, UPDATE_LOANS } from "@/services/graphql/loans-gql";
import {
  OperationVariables,
  ApolloQueryResult,
  useQuery,
  useMutation,
} from "@apollo/client";

import { safeParseJSON } from "@/helpers";
import { User } from "@/services/model/user";
import Cookies from "js-cookie";
import { GET_LOANS_CONFIGS } from "@/services/graphql/loans-config-gql";
import { LoansConfig } from "@/services/model/loansconfig";
import { GET_COMPANY_INFO } from "@/services/graphql/company_info-gql";
import { CompanyInfo } from "@/services/model/info-company";
import { useSearchParams } from "react-router-dom";

import LoanDetailSkeleton from "./LoanSkeleton";
import { getStatus } from "@/constants";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "@/hook";
import { COLOR_STATUS } from "@/contants/contants";

export default function LoanDetailCard() {
  const [open, setOpen] = useState(false);
  const userInfo = safeParseJSON(
    (Cookies.get("user_info") || "") as string
  ) as User;
  const router = useRouter();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
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
  } = useQuery(GET_LOAN_BY_ID, {
    variables: {
      id: Number(id),
    },
    skip: !Number(id),
  });

  const [updateLoans, { data, loading: loadingUpdateLoan }] =
    useMutation(UPDATE_LOANS);

  const { data: dataLoanConfigs }: { data: { loans_config: LoansConfig[] } } =
    useQuery(GET_LOANS_CONFIGS);
  const { data: dataCompanyInfo }: { data: { company_info: CompanyInfo[] } } =
    useQuery(GET_COMPANY_INFO);

  const formatCurrency = (num: number) =>
    num.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });

  const handleConfirmContact = async () => {
    await updateLoans({
      variables: {
        id: dataLoanUser?.loans?.[0].id, // ID khoản vay
        data: {
          updatedAt: new Date().toISOString(),
          status: ENUM_STATUS_LOAN.IN_CONTACT,
        },
      },
    });
    refetchCurrentLoan();
  };
  if (loading || loadingUpdateLoan) {
    return <LoanDetailSkeleton />;
  }

  if (!dataLoanUser?.loans?.[0]) {
    return (
      <div className="w-full flex justify-center flex-col items-center">
        <img
          src="/file-not-found.jpg"
          alt="file-not-found.jpg"
          className="w-[300px]"
        />
        <Typography fontWeight="bold" mb={10}>
          Không tìm thấy hợp đồng vay nào
        </Typography>
      </div>
    );
  }

  const renderButtonPay = () => {
    console.log(
      "dataLoanUser?.loans?.[0]?.status",
      dataLoanUser?.loans?.[0]?.status
    );

    if (dataLoanUser?.loans?.[0]?.status === ENUM_STATUS_LOAN.IN_CONTACT) {
      return (
        <>
          <Typography> </Typography>
          <Typography fontWeight="bold" color="orange" textAlign="end">
            <Button
              // startIcon={<Handshake size={18} />}
              variant="outlined"
              onClick={() =>
                router.push("/thanh-toan?id=" + dataLoanUser?.loans?.[0]?.id)
              }
            >
              Đi đến thanh toán
            </Button>
          </Typography>
        </>
      );
    }
    return "";
  };
  return (
    <div className="pb-10">
      <div className="w-full bg-[#e9f2f9] text-center py-10 ">
        <Typography variant="h4">CHI TIẾT KHOẢN VAY</Typography>
      </div>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          maxWidth: 1000,
          mx: "auto",
          mt: 3,
          backgroundColor: "#fff",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 1,
        }}
      >
        {/* Left Sidebar */}

        {/* Right content */}
        <Box sx={{ flex: 1, p: 3 }}>
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography fontWeight="bold" mb={2}>
              Loại giao dịch: Hợp đồng vay tiền
            </Typography>
            <Box display="grid" gridTemplateColumns="1fr 1fr" rowGap={2}>
              <Typography>Mã hợp đồng:</Typography>
              <Typography fontWeight="bold" textAlign="end">
                ***{dataLoanUser?.loans?.[0]?.loan_code.slice(-5)}
              </Typography>

              <Typography>Số tiền vay:</Typography>
              <Typography fontWeight="bold" textAlign="end">
                {formatCurrency(dataLoanUser?.loans?.[0]?.price)}
              </Typography>

              <Typography>Thời hạn vay:</Typography>
              <Typography fontWeight="bold" textAlign="end">
                {dataLoanUser?.loans?.[0]?.num_months} tháng
              </Typography>

              <Typography>Ngày đăng ký:</Typography>
              <Typography fontWeight="bold" textAlign="end">
                {dayjs(dataLoanUser?.loans?.[0]?.createdAt).format(
                  "DD/MM/YYYY HH:mm"
                )}
              </Typography>

              <Typography>Tình trạng:</Typography>
              <Typography fontWeight="bold" color="orange" textAlign="end">
                {dataLoanUser?.loans?.[0]?.status ===
                ENUM_STATUS_LOAN.WAIT_COMFIRM_CONTACT ? (
                  <Button
                    startIcon={<Handshake size={18} />}
                    variant="outlined"
                    onClick={handleConfirmContact}
                  >
                    Chấp nhận hợp đồng vay ngay
                  </Button>
                ) : (
                  <span
                    className={`${
                      COLOR_STATUS[dataLoanUser?.loans?.[0]?.status]
                    } p-2 rounded-[8px]`}
                  >
                    {getStatus(dataLoanUser?.loans?.[0]?.status)}
                  </span>
                )}
              </Typography>

              {renderButtonPay()}
            </Box>
            <Box textAlign="center" mt={3}>
              <Button
                startIcon={<Eye size={18} />}
                variant="contained"
                onClick={() => setOpen(true)}
              >
                Xem hợp đồng
              </Button>
            </Box>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography fontWeight="bold" mb={2}>
              Tình trạng giải ngân:
            </Typography>
            <Box display="flex" gap={2}>
              <Box
                sx={{
                  backgroundColor: "#f8f9fa",
                  borderRadius: 1,
                  px: 2,
                  py: 1,
                  fontWeight: "bold",
                  color: "red",
                  flex: 1,
                }}
              >
                Lãi suất: {dataLoanUser?.loans?.[0]?.rate}%/tháng
              </Box>
              <Box
                sx={{
                  backgroundColor: "#f8f9fa",
                  borderRadius: 1,
                  px: 2,
                  py: 1,
                  fontWeight: "bold",
                  color: "#dc3545",
                  flex: 1,
                }}
              >
                Thanh toán hàng tháng:{" "}
                {formatCurrency(
                  dataLoanUser?.loans?.[0]?.detail[0]?.total_payment ?? 0
                )}
              </Box>
            </Box>
          </Paper>

          <Box textAlign="center" mt={3}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => router.push("/ho-so?type=2")}
            >
              <ArrowBack /> Quay lại danh sách khoản vay
            </Button>
          </Box>
        </Box>

        {/* Modal */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90vw",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <Typography fontWeight="bold" textAlign="center" mb={2}>
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </Typography>
            <Typography textAlign="center" mb={1}>
              Độc lập - Tự do - Hạnh phúc
            </Typography>
            <Typography textAlign="center" mb={2} fontWeight="bold">
              HỢP ĐỒNG VAY TIỀN
            </Typography>

            <Typography mb={1}>
              Bên A (Bên cho vay): CÔNG TY TÀI CHÍNH HD SAISON VIỆT NAM
            </Typography>
            <Typography mb={1}>
              Bên B (Bên vay) Ông/Bà :{" "}
              <strong>{dataLoanUser?.loans?.[0]?.user?.full_name}</strong>
            </Typography>
            <Typography mb={1}>
              Số CMT / CCCD :{" "}
              <strong>{dataLoanUser?.loans?.[0]?.user?.identity_number}</strong>
            </Typography>
            <Typography mb={1}>
              Ngày ký:{" "}
              {dayjs(dataLoanUser?.loans?.[0].createdAt).format("DD/MM/YYYY")}
            </Typography>
            <Typography mb={1}>
              Số tiền khoản vay:{" "}
              {formatCurrency(dataLoanUser?.loans?.[0].price)}
            </Typography>
            <Typography mb={1}>
              Thời gian vay: {dataLoanUser?.loans?.[0].num_months} tháng
            </Typography>
            <Typography mb={2}>
              Lãi suất vay: {dataLoanUser?.loans?.[0].rate}% mỗi tháng
            </Typography>

            <Typography>
              <p>
                Hợp đồng n&ecirc;u r&otilde; c&aacute;c b&ecirc;n đ&atilde; đạt
                được thỏa thuận vay sau khi thương lượng v&agrave; tr&ecirc;n cơ
                sở b&igrave;nh đẳng , tự nguyện v&agrave; nhất tr&iacute; . Tất
                cả c&aacute;c b&ecirc;n cần đọc kỹ tất cả c&aacute;c điều khoản
                trong thỏa thuận n&agrave;y, sau khi k&yacute; v&agrave;o thỏa
                thuận n&agrave;y coi như c&aacute;c b&ecirc;n đ&atilde; hiểu đầy
                đủ v&agrave; đồng &yacute; ho&agrave;n to&agrave;n với tất cả
                c&aacute;c điều khoản v&agrave; nội dung trong thỏa thu&acirc;n
                n&agrave;y.
              </p>
              <p>
                1.Ph&ugrave; hợp với c&aacute;c nguy&ecirc;n tắc b&igrave;nh
                đẳng, tự nguyện, trung thực v&agrave; uy t&iacute;n, hai
                b&ecirc;n thống nhất k&yacute; kết hợp đồng vay sau khi thương
                lượng v&agrave; c&ugrave;ng cam kết thực hiện.
              </p>
              <p>
                2.B&ecirc;n B cung cấp t&agrave;i liệu đ&iacute;nh k&egrave;m
                của hợp đồng vay v&agrave; c&oacute; hiệu lực ph&aacute;p
                l&yacute; như hợp đồng vay n&agrave;y.
              </p>
              <p>
                3.B&ecirc;n B sẽ tạo lệnh t&iacute;nh tiền gốc v&agrave;
                l&atilde;i dựa tr&ecirc;n số tiền vay từ v&iacute; ứng dụng do
                b&ecirc;n A cung cấp.
              </p>
              <p>4.Điều khoản đảm bảo.</p>
              <p>
                - B&ecirc;n vay kh&ocirc;ng được sử dụng tiền vay để thực hiện
                c&aacute;c hoạt động bất hợp ph&aacute;p .Nếu kh&ocirc;ng,
                b&ecirc;n A c&oacute; quyền y&ecirc;u cầu b&ecirc;n B
                ho&agrave;n trả ngay tiền gốc v&agrave; l&atilde;i, b&ecirc;n B
                phải chịu c&aacute;c tr&aacute;ch nhi&ecirc;m ph&aacute;p
                l&yacute; ph&aacute;t sinh từ đ&oacute;.
              </p>
              <p>
                - B&ecirc;n vay phải trả nợ gốc v&agrave; l&atilde;i trong thời
                gian quy định hợp đồng. Đối với phần qu&aacute; hạn, người cho
                vay c&oacute; quyền thu hồi nơ trong thời hạn v&agrave; thu (
                l&atilde;i qu&aacute; hạn ) % tr&ecirc;n tổng số tiền vay trong
                ng&agrave;y.
              </p>
              <p>
                - Gốc v&agrave; l&atilde;i của mỗi lần trả nợ sẽ được hệ thống
                tự động chuyển từ t&agrave;i khoản ng&acirc;n h&agrave;ng do
                b&ecirc;n B bảo lưu sang t&agrave;i khoản ng&acirc;n h&agrave;ng
                của b&ecirc;n A . B&ecirc;n B phải đảm bảo c&oacute; đủ tiền
                trong t&agrave;i khoản ng&acirc;n h&agrave;ng trước ng&agrave;y
                trả nợ h&agrave;ng th&aacute;ng.
              </p>
              <p>5.Chịu tr&aacute;ch nhiệm do vi pham hợp đồng</p>
              <p>
                - Nếu b&ecirc;n B kh&ocirc;ng trả được khoản vay theo quy định
                trong hợp đồng. B&ecirc;n B phải chịu c&aacute;c khoản bồi
                thường thiệt hại đ&atilde; thanh l&yacute; v&agrave; ph&iacute;
                luật sư, ph&iacute; kiện tụng, chi ph&iacute; đi lại v&agrave;
                c&aacute;c chi ph&iacute; kh&aacute;c ph&aacute;t sinh do kiện
                tụng.
              </p>
              <p>
                - Khi b&ecirc;n A cho rẳng b&ecirc;n B đ&atilde; hoặc c&oacute;
                thể xảy ra t&igrave;nh huống ảnh hưởng đến khoản vay th&igrave;
                b&ecirc;n A c&oacute; quyền y&ecirc;u cầu b&ecirc;n B phải trả
                lại kịp thời trược thời hạn.
              </p>
              <p>
                - Người vay v&agrave; người bảo l&atilde;nh kh&ocirc;ng được vi
                phạm điều lệ hợp đồng v&igrave; bất kỳ l&yacute; do g&igrave;
              </p>
              <p>6.Phương thức giải quyết tranh chấp hợp đồng.</p>
              <p>
                Tranh chấp ph&aacute;t sinh trong qu&aacute; tr&igrave;nh thực
                hiện hợp đồng n&agrave;y sẽ được giải quyết th&ocirc;ng qua
                thương lượng th&acirc;n thiện giữa c&aacute;c b&ecirc;n hoặc
                c&oacute; thể nhờ b&ecirc;n thứ ba l&agrave;m trung gian
                h&ograve;a giải .Nếu thương lượng hoặc h&ograve;a giải
                kh&ocirc;ng th&agrave;nh, c&oacute; thể khởi kiện ra t&ograve;a
                &aacute;n nh&acirc;n d&acirc;n nơi b&ecirc;n A c&oacute; trụ sở.
              </p>
              <p>
                7.Khi người vay trong qu&aacute; tr&igrave;nh x&eacute;t duyệt
                khoản vay kh&ocirc;ng th&agrave;nh c&ocirc;ng do nhiều yếu tố
                kh&aacute;c nhau như chứng minh thư sai, thẻ ng&acirc;n
                h&agrave;ng sai, danh bạ sai. Việc th&ocirc;ng tin sai lệch
                n&agrave;y sẽ khiến hệ thống ph&aacute;t hiện nghi ngờ gian lận
                hoặc giả mạo khoản vay v&agrave; b&ecirc;n vay phải chủ động hợp
                t&aacute;c với b&ecirc;n A để xử l&yacute;.
              </p>
              <p>
                8.Nếu kh&ocirc;ng hợp t&aacute;c. B&ecirc;n A c&oacute; quyền
                khởi kiện ra T&ograve;a &aacute;n nh&acirc;n d&acirc;n v&agrave;
                tr&igrave;nh b&aacute;o l&ecirc;n Trung t&acirc;m B&aacute;o
                c&aacute;o t&iacute;n dụng của Ng&acirc;n h&agrave;ng nh&agrave;
                nước Việt Nam , hồ sơ nợ xấu sẽ được phản &aacute;nh trong
                b&aacute;o c&aacute;o t&iacute;n dụng , ảnh hưởng đến t&iacute;n
                dụng sau n&agrave;y của người vay, vay vốn ng&acirc;n
                h&agrave;ng v&agrave; hạn chế ti&ecirc;u d&ugrave;ng của người
                th&acirc;n, con c&aacute;i người vay ...
              </p>
              <p>
                Khi hồ sơ kh&aacute;ch h&agrave;ng được chấp thuận v&agrave;
                đ&atilde; nhập m&atilde; OTP. Tức hợp đồng giữa hai b&ecirc;n
                c&oacute; hiệu lực, B&ecirc;n B phải c&oacute; tr&aacute;ch
                nhiệm v&agrave; nghĩa vụ phải thanh to&aacute;n l&atilde;i suất
                h&agrave;ng th&aacute;ng cho b&ecirc;n A, Số tiền l&atilde;i
                v&agrave; gốc h&agrave;ng th&aacute;ng được t&iacute;nh theo
                phương thức giảm dần. Nếu b&ecirc;n A hoặc B l&agrave;m
                tr&aacute;i với quy định hợp đồng th&igrave; sẽ phải chịu
                tr&aacute;ch nhiệm bồi thường thiệt hại v&agrave; xử l&yacute;
                trước ph&aacute;p luật..
              </p>
            </Typography>

            <div className="border-t-gray-200 p-10 flex justify-between">
              <div>
                <Typography textAlign="center" mb={2} fontWeight="bold">
                  NGƯỜI VAY
                </Typography>
                <img
                  src={dataLoanUser?.loans?.[0].signature}
                  alt="signature"
                  className="w-[100px] md:w-[300px]"
                />
                <Typography textAlign="center" mt={2} fontWeight="bold">
                  {dataLoanUser?.loans?.[0]?.user?.full_name}
                </Typography>
              </div>

              <div>
                <Typography textAlign="center" mb={2} fontWeight="bold">
                  NGƯỜI ĐẠI DIỆN
                </Typography>
                <img
                  src={dataLoanConfigs?.loans_config?.[0]?.signature}
                  alt="signature"
                  className="w-[100px] md:w-[300px]"
                />
                <Typography textAlign="center" mb={2} fontWeight="bold">
                  {dataCompanyInfo?.company_info?.[0]?.name}
                </Typography>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setOpen(false)}>Đóng</Button>
            </div>
          </Box>
        </Modal>
      </Box>
    </div>
  );
}
