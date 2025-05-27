import { useState } from "react";
import { useContracts } from "../hooks/useConstracts";
import Link from "next/link";

export default function Home() {
  const { contracts, loading, error } = useContracts();

  const [selectedCenter, setSelectedCenter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [contractName, setContractName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [filteredContracts, setFilteredContracts] = useState([]);

  const handleSearch = () => {
    const result = contracts.filter((contract) => {
      const centerMatch = selectedCenter
        ? contract.contract_center.some((c) => c.center.name === selectedCenter)
        : true;
      const categoryMatch = selectedCategory
        ? contract.contract_category === selectedCategory
        : true;
      const nameMatch = contractName
        ? contract.contract_name.includes(contractName)
        : true;
      const startDateMatch = startDate
        ? new Date(contract.contract_date) >= new Date(startDate)
        : true;
      const endDateMatch = endDate
        ? new Date(contract.contract_date) <= new Date(endDate)
        : true;

      return (
        centerMatch &&
        categoryMatch &&
        nameMatch &&
        startDateMatch &&
        endDateMatch
      );
    });
    setFilteredContracts(result);
  };

  const displayContracts =
    filteredContracts.length > 0 ? filteredContracts : contracts;

  const formatDate = (dateStr) => new Date(dateStr).toISOString().split("T")[0];

  const calcDaysLeft = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    return diff < 0 ? "계약 만료" : `${diff}일`;
  };

  const categoryMap = {
    GENERAL: "일반계약",
    UNIT_PRICE: "단가계약",
    LEASE: "임대계약",
    CONSTRUCTION: "공사계약",
    SALE: "매각계약",
    SERVICE: "용역계약",
    MAINTENANCE: "유지보수계약",
    OTHER: "기타계약",
  };

  const typeMap = {
    FIRST: "최초계약",
    EXTEND: "연장계약",
    CHANGE: "변경계약",
  };

  const methodMap = {
    DIRECT: "수의",
    BID: "입찰",
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-30 bg-indigo-900 text-white p-4 space-y-4">
        <div className="text-2xl font-bold mb-6">계약조회</div>
        <nav className="space-y-2">
          <div className="hover:bg-indigo-700 p-2 rounded">홈</div>
          <div className="hover:bg-indigo-700 p-2 rounded">계약</div>
          <div className="hover:bg-indigo-700 p-2 rounded">문서</div>
          <div className="hover:bg-indigo-700 p-2 rounded">설정</div>
        </nav>
      </aside>

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">계약조회</h1>
          <div className="flex items-center space-x-4">
            <button className="text-sm bg-gray-200 px-3 py-1 rounded">
              로그아웃
            </button>
            <button className="text-sm bg-gray-200 px-3 py-1 rounded">
              🌙
            </button>
          </div>
        </div>

        {/* 검색 */}
        <div className="bg-white p-4 rounded shadow mb-4 flex flex-wrap gap-4">
          <select
            className="border p-2 rounded"
            value={selectedCenter}
            onChange={(e) => setSelectedCenter(e.target.value)}
          >
            <option value="">센터 선택</option>
            <option value="재단본부">재단본부</option>
            <option value="전국">전국</option>
          </select>

          <select
            className="border p-2 rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">계약종류 선택</option>
            <option value="GENERAL">일반계약</option>
            <option value="UNIT_PRICE">단가계약</option>
            <option value="LEASE">임대계약</option>
            <option value="CONSTRUCTION">공사계약</option>
            <option value="SALE">매각계약</option>
            <option value="SERVICE">용역계약</option>
            <option value="MAINTENANCE">유지보수계약</option>
            <option value="OTHER">기타계약</option>
          </select>

          <input
            type="text"
            className="border p-2 rounded"
            placeholder="계약명"
            value={contractName}
            onChange={(e) => setContractName(e.target.value)}
          />

          <input
            type="date"
            className="border p-2 rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <button
            onClick={handleSearch}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            조회
          </button>
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-sm">
            총 데이터 {displayContracts.length} 개
          </span>
          <div className="space-x-2">
            <button className="bg-indigo-600 text-white px-3 py-1 rounded">
              추가
            </button>
            <button className="bg-gray-200 px-3 py-1 rounded">
              전체다운로드
            </button>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "센터",
                  "입찰번호",
                  "계약번호",
                  "계약종류",
                  "계정명",
                  "계약명",
                  "계약일자",
                  "계약시작일",
                  "계약만료일",
                  "잔여일수",
                  "공급사",
                  "예정가격",
                  "계약가격",
                  "계약방법",
                  "계약증권",
                  "하자증권",
                  "계약품의번호",
                  "계약구분",
                  "담당자",
                  "기타",
                  "열람",
                ].map((header) => (
                  <th key={header} className="px-2 py-1 border">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayContracts.map((contract) => {
                const centers =
                  contract.contract_center?.map((c) => c.center.name) || [];
                const accounts =
                  contract.contract_account?.map((a) => a.account.name) || [];
                const centerDisplay =
                  centers.length > 1
                    ? `${centers[0]} 외 ${centers.length - 1}개`
                    : centers[0] || "";
                const accountDisplay =
                  accounts.length > 1
                    ? `${accounts[0]} 외 ${accounts.length - 1}개`
                    : accounts[0] || "";

                return (
                  <tr
                    key={contract.contract_number}
                    className="hover:bg-gray-50"
                  >
                    <td className="border px-2 py-1">{centerDisplay}</td>
                    <td className="border px-2 py-1">
                      {contract.bid_number ? (
                        <Link
                          href={contract.bid_number}
                          className="text-blue-500 underline"
                        >
                          {contract.bid_number}
                        </Link>
                      ) : (
                        ""
                      )}
                    </td>
                    <td className="border px-2 py-1">
                      <Link
                        href={`/contracts/${contract.contract_number}`}
                        className="text-blue-600 hover:underline"
                      >
                        구매계약 {contract.contract_number}
                      </Link>
                    </td>
                    <td className="border px-2 py-1">
                      {categoryMap[contract.contract_category]}
                    </td>
                    <td className="border px-2 py-1">{accountDisplay}</td>
                    <td className="border px-2 py-1">
                      {contract.contract_name}
                    </td>
                    <td className="border px-2 py-1">
                      {formatDate(contract.contract_date)}
                    </td>
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
                    <td className="border px-2 py-1">
                      {contract.expected_price}
                    </td>
                    <td className="border px-2 py-1">
                      {contract.contract_price}
                    </td>
                    <td className="border px-2 py-1">
                      {methodMap[contract.contract_method]}
                    </td>
                    <td className="border px-2 py-1">
                      {contract.deposit_file_url ? "Y" : "N"}
                    </td>
                    <td className="border px-2 py-1">
                      {contract.approval_file_url ? "Y" : "N"}
                    </td>
                    <td className="border px-2 py-1">
                      {contract.approval_number}
                    </td>
                    <td className="border px-2 py-1">
                      {typeMap[contract.contract_type]}
                    </td>
                    <td className="border px-2 py-1">
                      {contract.manager_name}
                    </td>
                    <td className="border px-2 py-1">
                      {contract.additional_notes ? "Y" : "N"}
                    </td>
                    <td className="border px-2 py-1">
                      <button className="text-blue-500 underline">
                        다운로드
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
