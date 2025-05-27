import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ContractDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/contract/${id}`)
        .then(res => res.json())
        .then(data => {
          setContract(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (!contract) return <div>데이터 없음</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">계약 상세: {contract.contract_name}</h1>

      <div className="mb-4">
        <p>계약번호: {contract.contract_number}</p>
        <p>계약종류: {contract.contract_category}</p>
        <p>계약방법: {contract.contract_method}</p>
        <p>담당자: {contract.manager_name}</p>
        <p>공급사: {contract.supplier}</p>
        {/* 여기에 center, account 표시 */}
        <p>
          센터:{' '}
          {contract.contract_center.map(c => c.center.name).join(', ')}
        </p>
        <p>
          계정명:{' '}
          {contract.contract_account.map(a => a.account.name).join(', ')}
        </p>
      </div>

      <h2 className="text-lg font-bold mb-2">연결된 데이터</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th>ERP 코드</th>
            <th>ERP 품목명</th>
            <th>입찰번호</th>
            <th>계약종류</th>
            <th>모델명</th>
            <th>규격</th>
            <th>제조사</th>
            <th>예정단가</th>
            <th>예정가격</th>
            <th>계약단가</th>
            <th>계약가격</th>
          </tr>
        </thead>
        <tbody>
          {contract.data.map((d) => (
            <tr key={d.id}>
              <td className="border px-2 py-1">{d.erp_code}</td>
              <td className="border px-2 py-1">{d.erp_item_name}</td>
              <td className="border px-2 py-1">{d.bid_number}</td>
              <td className="border px-2 py-1">{d.contract_category}</td>
              <td className="border px-2 py-1">{d.model_number}</td>
              <td className="border px-2 py-1">{d.specification}</td>
              <td className="border px-2 py-1">{d.manufacturer}</td>
              <td className="border px-2 py-1">{d.expected_unit_price}</td>
              <td className="border px-2 py-1">{d.expected_price}</td>
              <td className="border px-2 py-1">{d.contract_unit_price}</td>
              <td className="border px-2 py-1">{d.contract_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
