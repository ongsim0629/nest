import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Table } from "../../components/table";
import Button from "../../components/button";
import { FaMoon } from "react-icons/fa";
import DetailHeader from "../../components/detail_header";
import CustomizedText from "../../components/customized_text";
import Content from "../../components/content";

export default function ContractDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [contractData, setContractData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/contract/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("fetch 응답:", data);
          setContractData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    if (contractData) {
      console.log("렌더링 후 contract:", contractData.contract);
      console.log("렌더링 후 centers:", contractData.centers);
      console.log("렌더링 후 accounts:", contractData.accounts);
      console.log("렌더링 후 enums:", contractData.enums);
    }
  }, [contractData]);

  if (loading) return <div>로딩 중...</div>;
  if (!contractData) return <div>데이터 없음</div>;

  const contract = contractData.contract;

  if (!contract) return <div>계약 데이터 없음</div>;

  const headers = [
    "센터명",
    "ERP 코드",
    "ERP 품목명",
    "입찰번호",
    "계약종류",
    "계정명",
    "모델명",
    "규격",
    "제조사",
    "공급사",
    "수량",
    "예정단가",
    "예정가격",
    "계약단가",
    "계약가격",
  ];

  const tableData = (contract?.data || []).map((item) => [
    (contract?.contract_center || []).map((c) => c.center_name).join(", ") ||
      "-",
    item.erp_code || "-",
    item.erp_item_name || "-",
    item.bid_number || "-",
    item.contract_category || "-",
    (contract?.contract_account || []).map((a) => a.account_name).join(", ") ||
      "-",
    item.model_number || "-",
    item.specification || "-",
    item.manufacturer || "-",
    contract.supplier || "-",
    item.quantity != null ? item.quantity : "-",
    item.expected_unit_price != null ? item.expected_unit_price : "-",
    item.expected_price != null ? item.expected_price : "-",
    item.contract_unit_price != null ? item.contract_unit_price : "-",
    item.contract_price != null ? item.contract_price : "-",
  ]);

  return (
    <div className="p-4">
      <div className="flex justify-end items-right mb-4">
        <Button color="white" size="lg">
          <FaMoon />
        </Button>
      </div>
      <CustomizedText color="navy" size="lg" children="계약상세조회" />
      <div className="flex justify-end mb-2">
        <div className="space-x-2">
          <Button color="gray" size="md" children="수정" />
          <Button color="white-gray" size="md" children="삭제" />
        </div>
      </div>

      <DetailHeader type="contents" title="계약사항" />
      <Content
        contract={contractData.contract}
        centers={contractData.centers}
        accounts={contractData.accounts}
        enums={contractData.enums}
      />

      <div className="flex justify-end mb-2">
        <div className="space-x-2">
          <Button color="navy" size="md" children="업로드" />
          <Button color="gray" size="md" children="양식다운로드" />
          <Button color="gray" size="md" children="전체다운로드" />
        </div>
      </div>

      <div className="flex justify-between mb-2">
        <CustomizedText color="navy" size="sm" className="font-bold">
          총 데이터 {contract?.data?.length || 0} 개
        </CustomizedText>
      </div>

      <DetailHeader
        type="table"
        title="계약내역"
        count={contract?.data?.length || 0}
      />
      <div className="overflow-x-auto bg-white rounded shadow-lg">
        <Table columns={headers} data={tableData} />
      </div>
    </div>
  );
}
