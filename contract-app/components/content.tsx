import ButtonGroup from "./button_group";
import RadioGroup from "./radio_group";
import TextArea from "./text_area";
import UploadField from "./upload_field";
import ContentRow from "./content_row";

export default function Content({ contract, centers, accounts, enums }) {
  const selectedCenters =
    contract?.contract_center?.map((center) => center.center_name) || [];
  const selectedAccounts =
    contract?.contract_account?.map((a) => a.account_name) || [];
  const selectedType = contract?.contract_type;
  const selectedMethod = contract?.contract_method;
  const selectedCategory = contract?.contract_category;

    const formatDate = (dateStr:string) =>
    dateStr ? new Date(dateStr).toISOString().split("T")[0] : "-";

  return (
    <div className="space-y-6 shadow-lg mb-10">
      <div className="space-y-4">
          <ContentRow type="button" label="센터명" isEssential={true} options={centers.map((c) => c.name)} value={selectedCenters}/>
          <ContentRow type="text" label="입찰번호" value={contract.bid_number || ""}/>
          <ContentRow type="text" label="계약번호" isEssential={true} value={"구매계약 " + contract.contract_number}/>
          <ContentRow type="radio" label="계약구분" isEssential={true} options={[
              { value: "FIRST", label: "최초계약" },
              { value: "EXTEND", label: "연장계약" },
              { value: "CHANGE", label: "변경계약" },
            ]}  value ={selectedType}/>
          <ContentRow type="button" label="계정명" isEssential={true}options={accounts.map((c) => c.name)} value={selectedAccounts}/>
          <ContentRow type="number" label="계약명" isEssential={true} value={contract.contract_name}/>
          <ContentRow type="radio" label="거래방법" isEssential={true} options={[
              { value: "BID", label: "입찰" },
              { value: "DIRECT", label: "수의" },
            ]}  value ={selectedMethod}/>
          <ContentRow type="radio" label="거래종류" isEssential={true} options={[
              { value: "GENERAL", label: "일반계약" },
              { value: "UNIT_PRICE", label: "단가계약" },
              { value: "LEASE", label: "임대계약" },
              { value: "CONSTRUCTION", label: "공사계약" },
              { value: "SALE", label: "매각계약" },
              { value: "SERVICE", label: "용역계약" },
              { value: "MAINTENANCE", label: "유지보수계약" },
              { value: "OTHER", label: "기타계약" },
            ]}  value ={selectedCategory}/>
          <ContentRow type="date" label="계약일자" isEssential={true} value={formatDate(contract.contract_date)}/>
          <ContentRow type="date" label="계약시작일" isEssential={true} value={formatDate(contract.contract_start_date)}/>
          <ContentRow type="date" label="계약종료일" isEssential={true} value={formatDate(contract.contract_end_date)}/>
          <ContentRow type="number" label="공급사" isEssential={true} value={contract.supplier}/>
          <ContentRow type="number" label="계약가격" isEssential={true} value={contract.contract_price}/>
          <ContentRow type="file" label="계약품의"/>
          <ContentRow type="file" label="계약서"/>
          <ContentRow type="number" label="계약품의번호" isEssential={true} value={contract.approval_number}/>
          <ContentRow type="file" label="계약보증금" value="1"/>
          <ContentRow type="file" label="하자이행보증금" value="1"/>
          <ContentRow type="number" label="예정가격" isEssential={true} value={contract.expected_price}/>
          <ContentRow type="text_area" label="계약기타사항" value={contract.additional_notes}/>
      </div>
    </div>
  );
}
