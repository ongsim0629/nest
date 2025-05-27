import { useContracts } from '../hooks/useConstracts';
import Link from 'next/link';

export default function Home() {
  const { contracts, loading, error } = useContracts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log('계약 목록:', contracts);

  const formatDate = (dateStr) =>
    new Date(dateStr).toISOString().split('T')[0];

  const calcDaysLeft = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    return diff < 0 ? '계약 만료' : `${diff}일`;
  };

  const categoryMap = {
    GENERAL: '일반계약',
    UNIT_PRICE: '단가계약',
    LEASE: '임대계약',
    CONSTRUCTION: '공사계약',
    SALE: '매각계약',
    SERVICE: '용역계약',
    MAINTENANCE: '유지보수계약',
    OTHER: '기타계약',
  };

  const typeMap = {
    FIRST: '최초계약',
    EXTEND: '연장계약',
    CHANGE: '변경계약',
  };

  const methodMap = {
    DIRECT: '수의',
    BID: '입찰',
  };

  return (
    
    <div className="p-4">
      <h1>계약조회</h1>
      <h1 className="text-xl font-bold mb-4">총 데이터 {contracts.length} 개</h1>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th>센터</th>
            <th>입찰번호</th>
            <th>계약번호</th>
            <th>계약종류</th>
            <th>계정명</th>
            <th>계약명</th>
            <th>계약일자</th>
            <th>계약시작일</th>
            <th>계약만료일</th>
            <th>잔여일수</th>
            <th>공급사</th>
            <th>예정가격</th>
            <th>계약가격</th>
            <th>계약방법</th>
            <th>계약증권</th>
            <th>하자증권</th>
            <th>계약품의번호</th>
            <th>계약구분</th>
            <th>담당자</th>
            <th>기타</th>
            <th>열람</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract) => {
            const centers = contract.contract_center?.map(c => c.center.name) || [];
            const accounts = contract.contract_account?.map(a => a.account.name) || [];

            const centerDisplay =
              centers.length > 1
                ? `${centers[0]} 외 ${centers.length - 1}개`
                : centers[0] || '';

            const accountDisplay =
              accounts.length > 1
                ? `${accounts[0]} 외 ${accounts.length - 1}개`
                : accounts[0] || '';

            return (
              <tr key={contract.contract_number}>
                <td className="border px-2 py-1">{centerDisplay}</td>
                <td className="border px-2 py-1">
                  {contract.bid_number ? (
                    <Link href={contract.bid_number} className="text-blue-500 underline">
                      {contract.bid_number}
                    </Link>
                  ) : (
                    ''
                  )}
                </td>
                <td className="border px-2 py-1">
                    <Link href={`/contracts/${contract.contract_number}`} className="text-blue-600 hover:underline">
                    구매계약 {contract.contract_number}
                    </Link>
                </td>
                <td className="border px-2 py-1">
                  {categoryMap[contract.contract_category]}
                </td>
                <td className="border px-2 py-1">{accountDisplay}</td>
                <td className="border px-2 py-1">{contract.contract_name}</td>
                <td className="border px-2 py-1">{formatDate(contract.contract_date)}</td>
                <td className="border px-2 py-1">
                  {formatDate(contract.contract_start_date)}
                </td>
                <td className="border px-2 py-1">
                  {formatDate(contract.contract_end_date)}
                </td>
                <td className="border px-2 py-1">
                  {calcDaysLeft(contract.contract_end_date)}
                </td>
                <td className="border px-2 py-1">{contract.supplier}</td>
                <td className="border px-2 py-1">{contract.expected_price}</td>
                <td className="border px-2 py-1">{contract.contract_price}</td>
                <td className="border px-2 py-1">
                  {methodMap[contract.contract_method]}
                </td>
                <td className="border px-2 py-1">
                  {contract.deposit_file_url ? 'Y' : 'N'}
                </td>
                <td className="border px-2 py-1">
                  {contract.approval_file_url ? 'Y' : 'N'}
                </td>
                <td className="border px-2 py-1">{contract.approval_number}</td>
                <td className="border px-2 py-1">
                  {typeMap[contract.contract_type]}
                </td>
                <td className="border px-2 py-1">{contract.manager_name}</td>
                <td className="border px-2 py-1">
                  {contract.additional_notes ? 'Y' : 'N'}
                </td>
                <td className="border px-2 py-1">
                  <button className="text-blue-500 underline">다운로드</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
