import ButtonGroup from "./button_group";
import RadioGroup from "./radio_group";

export default function Content({ contract, centers, accounts, enums }) {
  const selectedCenters =
    contract?.contract_center?.map((c) => c.center_name) || [];
  const selectedAccounts =
    contract?.contract_account?.map((a) => a.account_name) || [];
  const selectedType = contract?.contract_type;
  const selectedMethod = contract?.contract_method;
  const selectedCategory = contract?.contract_category;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">센터명 *</label>
          <ButtonGroup
            options={centers.map((c) => c.name)}
            selected={selectedCenters}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">계약구분 *</label>
          <RadioGroup
            options={[
              { value: "FIRST", label: "최초계약" },
              { value: "EXTEND", label: "연장계약" },
              { value: "CHANGE", label: "변경계약" },
            ]}
            selected={selectedType}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">계정명 *</label>
          <ButtonGroup
            options={accounts.map((a) => a.name)}
            selected={selectedAccounts}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">계약방법 *</label>
          <RadioGroup
            options={[
              { value: "BID", label: "입찰" },
              { value: "DIRECT", label: "수의" },
            ]}
            selected={selectedMethod}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">계약종류 *</label>
          <RadioGroup
            options={[
              { value: "GENERAL", label: "일반계약" },
              { value: "UNIT_PRICE", label: "단가계약" },
              { value: "LEASE", label: "임대계약" },
              { value: "CONSTRUCTION", label: "공사계약" },
              { value: "SALE", label: "매각계약" },
              { value: "SERVICE", label: "용역계약" },
              { value: "MAINTENANCE", label: "유지보수계약" },
              { value: "OTHER", label: "기타계약" },
            ]}
            selected={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
}
