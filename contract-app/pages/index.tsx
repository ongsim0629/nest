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
import { Table } from "../components/table";

export default function Home() {
  const { contracts, loading, error } = useContracts();

  const [selectedCenter, setSelectedCenter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [contractName, setContractName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [filteredContracts, setFilteredContracts] = useState([]);

  const handleSearch = () => {
    console.log("Search filters:", {
      selectedCenter,
      selectedCategory,
      selectedAccount,
      selectedType,
      selectedMethod,
      contractName,
      startDate,
      endDate,
    });

    const result = contracts.filter((contract) => {
      console.log("Checking contract:", contract.contract_number);

      const centerMatch = selectedCenter
        ? contract.contract_center.some((c) => {
            console.log("Center check:", c.center.name, "vs", selectedCenter);
            return c.center.name === selectedCenter;
          })
        : true;

      const categoryMatch = selectedCategory
        ? contract.contract_category === selectedCategory
        : true;

      const typeMatch = selectedType
        ? contract.contract_type === selectedType
        : true;

      const methodMatch = selectedMethod
        ? contract.contract_method === selectedMethod
        : true;

      const accountMatch = selectedAccount
        ? contract.contract_account.some((a) => {
            console.log(
              "Account check:",
              a.account.name,
              "vs",
              selectedAccount
            );
            return a.account.name === selectedAccount;
          })
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

      const matches =
        centerMatch &&
        categoryMatch &&
        typeMatch &&
        methodMatch &&
        accountMatch &&
        nameMatch &&
        startDateMatch &&
        endDateMatch;

      console.log("Match results:", {
        centerMatch,
        categoryMatch,
        typeMatch,
        methodMatch,
        accountMatch,
        nameMatch,
        startDateMatch,
        endDateMatch,
        finalMatch: matches,
      });

      return matches;
    });

    setFilteredContracts(result);
    console.log("Filtered Contracts:", result);

    if (result.length === 0) {
      alert("검색 결과가 없습니다.");
    }
  };

  const displayContracts =
    filteredContracts.length > 0 ? filteredContracts : contracts;

  const headers = [
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
  ];

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

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toISOString().split("T")[0] : "-";

  const calcDaysLeft = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    return diff < 0 ? "계약 만료" : `${diff}일`;
  };

  const tableData = displayContracts.map((c, contractIndex) => {
    const centers = c.contract_center.map((v) => v.center.name);
    const accounts = c.contract_account.map((v) => v.account.name);

    const centerDisplay =
      centers.length > 1
        ? `${centers[0]} 외 ${centers.length - 1}개`
        : centers[0] || "";

    const accountDisplay =
      accounts.length > 1
        ? `${accounts[0]} 외 ${accounts.length - 1}개`
        : accounts[0] || "";

    return [
      centerDisplay,
      c.bid_number ? (
        <CustomizedText color="sky" size="sm">
          구매입찰 {c.bid_number}
        </CustomizedText>
      ) : (
        ""
      ),
      <Link
        href={`/contracts/${c.contract_number}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CustomizedText color="sky" size="sm">
          구매계약 {c.contract_number}
        </CustomizedText>
      </Link>,
      categoryMap[c.contract_category] || "-",
      accountDisplay,
      c.contract_name || "-",
      formatDate(c.contract_date),
      formatDate(c.contract_start_date),
      formatDate(c.contract_end_date),
      calcDaysLeft(c.contract_end_date),
      c.supplier || "-",
      c.expected_price || "-",
      c.contract_price || "-",
      methodMap[c.contract_method] || "-",
      c.deposit_file_url ? "Y" : "N",
      c.approval_file_url ? "Y" : "N",
      c.approval_number || "-",
      typeMap[c.contract_type] || "-",
      c.manager_name || "-",
      c.additional_notes ? "Y" : "N",
      <Button color="light-navy" size="sm">
        다운로드
      </Button>,
    ];
  });

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
            <Button
              color="navy"
              size="sm"
              className="flex items-center space-x-2"
            >
              <span>로그아웃</span>
              <FiLogOut />
            </Button>
            <Button color="white" size="lg">
              <FaMoon />
            </Button>
          </div>
        </div>

        {/* 타이틀 */}
        <CustomizedText color="navy" size="lg" children="계약조회" />

        <div className="flex justify-center m-7">
          <div className="flex items-center bg-white p-4 rounded shadow space-x-2">
            <Select
              type="center"
              value={selectedCenter}
              onChange={setSelectedCenter}
            />
            <Select
              type="type"
              value={selectedCategory} // selectedCategory를 사용하지만 type="type"로 설정
              onChange={setSelectedCategory}
            />
            <Select
              type="account"
              value={selectedAccount}
              onChange={setSelectedAccount}
            />
            <Select
              type="method"
              value={selectedMethod}
              onChange={setSelectedMethod}
            />
            <Input
              type="text"
              placeholder="계약명"
              value={contractName}
              onChange={setContractName}
            />
            <div className="flex items-center">
              <span className="mr-2 text-sm font-medium">계약일자</span>
              <Input type="date" value={startDate} onChange={setStartDate} />
              <Input type="date" value={endDate} onChange={setEndDate} />
            </div>
            <Button
              onClick={handleSearch}
              color="navy"
              size="md"
              className="ml-2 h-10 px-4 rounded"
            >
              조회
            </Button>
          </div>
        </div>

        {/* 계약 목록 헤더 */}
        <div className="flex justify-end mb-2">
          <div className="space-x-2">
            <Button color="navy" size="sm" children="추가" />
            <Button color="gray" size="sm" children="전체다운로드" />
          </div>
        </div>

        <div className="flex justify-between mb-2">
          <CustomizedText color="navy" size="sm" className="font-bold">
            총 데이터 {displayContracts.length} 개
          </CustomizedText>
        </div>

        {/* 계약 목록 테이블 */}
        <div className="overflow-x-auto bg-white rounded">
          <div className="rounded shadow m-1 text-center">
            <Table columns={headers} data={tableData} />
          </div>
        </div>
      </div>
    </div>
  );
}
