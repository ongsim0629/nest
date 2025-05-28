import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Table } from "../../components/table";

export default function ContractDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [contract, setContract] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/contract/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setContract(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (!contract) return <div>데이터 없음</div>;

  const headers = [
    "ERP 코드",
    "ERP 품목명",
    "입찰번호",
    "계약종류",
    "모델명",
    "규격",
    "제조사",
    "예정단가",
    "예정가격",
    "계약단가",
    "계약가격",
  ];

  const tableData = contract.data.map((item, idx) => [
    item.erp_code || "-",
    item.erp_item_name || "-",
    item.bid_number || "-",
    item.contract_category || "-",
    item.model_number || "-",
    item.specification || "-",
    item.manufacturer || "-",
    item.expected_unit_price != null ? item.expected_unit_price : "-",
    item.expected_price != null ? item.expected_price : "-",
    item.contract_unit_price != null ? item.contract_unit_price : "-",
    item.contract_price != null ? item.contract_price : "-",
  ]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        계약 상세: {contract.contract_name}
      </h1>

      <div className="mb-4 space-y-1">
        <p>계약번호: {contract.contract_number}</p>
        <p>계약종류: {contract.contract_category}</p>
        <p>계약방법: {contract.contract_method}</p>
        <p>담당자: {contract.manager_name}</p>
        <p>공급사: {contract.supplier}</p>
        <p>
          센터: {contract.contract_center.map((c) => c.center.name).join(", ")}
        </p>
        <p>
          계정명:{" "}
          {contract.contract_account.map((a) => a.account.name).join(", ")}
        </p>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow-lg">
        <Table columns={headers} data={tableData} />
      </div>
    </div>
  );
}
