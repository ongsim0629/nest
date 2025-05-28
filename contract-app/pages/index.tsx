import { useState } from "react";
import Button from "../components/button";
import CustomizedText from "../components/customized_text";
import Sidebar from "../components/sidebar";
import Select from "../components/select";
import Input from "../components/input";
import { useContracts } from "../hooks/useConstracts";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";


export default function Home() {
  const { contracts, loading, error } = useContracts();

  const [selectedCenter, setSelectedCenter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
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
      const typeMatch = selectedType ? contract.contract_type === selectedType : true;
      const methodMatch = selectedMethod ? contract.contrat_method === selectedMethod  : true;
      const startDateMatch = startDate
        ? new Date(contract.contract_date) >= new Date(startDate)
        : true;
      const endDateMatch = endDate
        ? new Date(contract.contract_date) <= new Date(endDate)
        : true;

      return (
        centerMatch &&
        categoryMatch &&
        typeMatch &&
        methodMatch &&
        nameMatch &&
        startDateMatch &&
        endDateMatch
      );
    });
    setFilteredContracts(result);
    console.log("Filtered Contracts:", result);
    if (result.length === 0) {
      alert("검색 결과가 없습니다.");
    }
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

  // 얘네도 나중에 리팩토링해서 따로 분리하는 게 나을 듯 or db 구조 수정 필요
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

  console.log("Filtered Contracts:", contracts);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      {/* 메인 */}
      <div className="flex-1 p-6">

        {/* 헤더 */}
        <div className="flex justify-end items-right mb-4">
          <div className="flex items-center space-x-5">
          <CustomizedText color="black" size="sm" className="font-bold">
            이성준 / 디지털헬스케어팀(SF파트/파트장)
          </CustomizedText>
          <Button color='navy' size='sm' className="flex items-center space-x-2">
          <span>로그아웃</span>
          <FiLogOut />
          </Button>
          <Button color ='white' size='lg'>
            <FaMoon />
          </Button>
          </div>
        </div>

        {/* 타이틀 */}
        <CustomizedText color="navy" size="lg" children="계약조회" />

        {/* 검색 */}
        <div className="flex justify-center items-center m-7">
          <div className="w-550 divide-x-2 divide divide-gray-200 h-40 border-1 border-gray-200 shadow-xl flex">
          
          <Select type="center"></Select>
          <Select type="type"></Select>
          <Select type = "account"></Select>
          <Select type="method"></Select>

          <Input type="text" placeholder="계약명" value={contractName}></Input>     

          <div className ="flex flex-col mx-2 justify-between">
            <CustomizedText color="black" size="sm" className="font-bold">
              계약일자
            </CustomizedText>
            
            <div className="flex space-x-2">
              <Input type="date" value={startDate}></Input>
              <Input type="date" value={endDate}></Input>
            </div>

          </div>
          <Button onClick={handleSearch} color ="navy" size="md" className="h-10" children="조회" />
        </div>
        </div>

        {/* 계약 목록 헤더 */}
        <div className="flex justify-end mb-2">
          <div className="space-x-2">
           <Button color="navy" size="sm" children="추가"/>
           <Button color="gray" size="sm" children="전체다운로드"/>
          </div>
        </div>

          <div className="flex justify-between mb-2">
            <CustomizedText color="navy" size="sm" className="font-bold"> 
              총 데이터 {displayContracts.length} 개
            </CustomizedText>
        </div>

        {/* 계약 목록 테이블 */}
        <div className="overflow-x-auto bg-white rounded">
          <table className="w-full text-sm rounded text-center shadow-lg">
            <thead className="bg-purple-100">
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
                  <th key={header} className="px-2 py-1">
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
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <CustomizedText color="sky" size="sm">
                          구매계약 {contract.contract_number}
                        </CustomizedText>
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
                    <td className=" px-2 py-1">
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
                      <Button color="light-navy" size="sm" children="다운로드" />
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
