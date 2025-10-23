import { Abi } from "starknet";

export const InheritXAbi: Abi = [
  {
    type: "impl",
    name: "InheritXPlans",
    interface_name: "inheritx_contracts::interfaces::iplans::IInheritXPlans",
  },
  {
    type: "struct",
    name: "core::byte_array::ByteArray",
    members: [
      {
        name: "data",
        type: "core::array::Array::<core::bytes_31::bytes31>",
      },
      {
        name: "pending_word",
        type: "core::felt252",
      },
      {
        name: "pending_word_len",
        type: "core::integer::u32",
      },
    ],
  },
  {
    type: "struct",
    name: "inheritx_contracts::base::types::BeneficiaryInput",
    members: [
      {
        name: "name",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "email",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "relationship",
        type: "core::byte_array::ByteArray",
      },
    ],
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    type: "struct",
    name: "inheritx_contracts::base::types::BeneficiaryData",
    members: [
      {
        name: "address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "percentage",
        type: "core::integer::u8",
      },
      {
        name: "email_hash",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "age",
        type: "core::integer::u8",
      },
      {
        name: "relationship",
        type: "core::byte_array::ByteArray",
      },
    ],
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    type: "struct",
    name: "inheritx_contracts::base::types::Beneficiary",
    members: [
      {
        name: "address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "name",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "email",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "relationship",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "claim_code_hash",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "has_claimed",
        type: "core::bool",
      },
      {
        name: "claimed_amount",
        type: "core::integer::u256",
      },
    ],
  },
  {
    type: "enum",
    name: "inheritx_contracts::base::types::AssetType",
    variants: [
      {
        name: "STRK",
        type: "()",
      },
      {
        name: "USDT",
        type: "()",
      },
      {
        name: "USDC",
        type: "()",
      },
      {
        name: "NFT",
        type: "()",
      },
    ],
  },
  {
    type: "enum",
    name: "inheritx_contracts::base::types::PlanStatus",
    variants: [
      {
        name: "Active",
        type: "()",
      },
      {
        name: "Executed",
        type: "()",
      },
      {
        name: "Cancelled",
        type: "()",
      },
      {
        name: "Overridden",
        type: "()",
      },
      {
        name: "Paused",
        type: "()",
      },
      {
        name: "Expired",
        type: "()",
      },
      {
        name: "AssetsLocked",
        type: "()",
      },
      {
        name: "AssetsReleased",
        type: "()",
      },
    ],
  },
  {
    type: "struct",
    name: "inheritx_contracts::base::types::InheritancePlan",
    members: [
      {
        name: "id",
        type: "core::integer::u256",
      },
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "beneficiary_count",
        type: "core::integer::u8",
      },
      {
        name: "asset_type",
        type: "inheritx_contracts::base::types::AssetType",
      },
      {
        name: "asset_amount",
        type: "core::integer::u256",
      },
      {
        name: "nft_token_id",
        type: "core::integer::u256",
      },
      {
        name: "nft_contract",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "timeframe",
        type: "core::integer::u64",
      },
      {
        name: "created_at",
        type: "core::integer::u64",
      },
      {
        name: "becomes_active_at",
        type: "core::integer::u64",
      },
      {
        name: "guardian",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "encrypted_details",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "status",
        type: "inheritx_contracts::base::types::PlanStatus",
      },
      {
        name: "is_claimed",
        type: "core::bool",
      },
      {
        name: "claim_code_hash",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "inactivity_threshold",
        type: "core::integer::u64",
      },
      {
        name: "last_activity",
        type: "core::integer::u64",
      },
      {
        name: "swap_request_id",
        type: "core::integer::u256",
      },
      {
        name: "escrow_id",
        type: "core::integer::u256",
      },
      {
        name: "security_level",
        type: "core::integer::u8",
      },
      {
        name: "auto_execute",
        type: "core::bool",
      },
      {
        name: "emergency_contacts_count",
        type: "core::integer::u8",
      },
    ],
  },
  {
    type: "enum",
    name: "inheritx_contracts::base::types::DistributionMethod",
    variants: [
      {
        name: "LumpSum",
        type: "()",
      },
      {
        name: "Quarterly",
        type: "()",
      },
      {
        name: "Yearly",
        type: "()",
      },
      {
        name: "Monthly",
        type: "()",
      },
    ],
  },
  {
    type: "enum",
    name: "inheritx_contracts::base::types::DisbursementStatus",
    variants: [
      {
        name: "Pending",
        type: "()",
      },
      {
        name: "Active",
        type: "()",
      },
      {
        name: "Paused",
        type: "()",
      },
      {
        name: "Completed",
        type: "()",
      },
      {
        name: "Cancelled",
        type: "()",
      },
    ],
  },
  {
    type: "struct",
    name: "inheritx_contracts::base::types::DistributionPlan",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
      },
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "total_amount",
        type: "core::integer::u256",
      },
      {
        name: "distribution_method",
        type: "inheritx_contracts::base::types::DistributionMethod",
      },
      {
        name: "period_amount",
        type: "core::integer::u256",
      },
      {
        name: "start_date",
        type: "core::integer::u64",
      },
      {
        name: "end_date",
        type: "core::integer::u64",
      },
      {
        name: "total_periods",
        type: "core::integer::u8",
      },
      {
        name: "completed_periods",
        type: "core::integer::u8",
      },
      {
        name: "next_disbursement_date",
        type: "core::integer::u64",
      },
      {
        name: "is_active",
        type: "core::bool",
      },
      {
        name: "beneficiaries_count",
        type: "core::integer::u8",
      },
      {
        name: "disbursement_status",
        type: "inheritx_contracts::base::types::DisbursementStatus",
      },
      {
        name: "created_at",
        type: "core::integer::u64",
      },
      {
        name: "last_activity",
        type: "core::integer::u64",
      },
      {
        name: "paused_at",
        type: "core::integer::u64",
      },
      {
        name: "resumed_at",
        type: "core::integer::u64",
      },
    ],
  },
  {
    type: "struct",
    name: "inheritx_contracts::base::types::EscrowAccount",
    members: [
      {
        name: "id",
        type: "core::integer::u256",
      },
      {
        name: "plan_id",
        type: "core::integer::u256",
      },
      {
        name: "asset_type",
        type: "inheritx_contracts::base::types::AssetType",
      },
      {
        name: "amount",
        type: "core::integer::u256",
      },
      {
        name: "nft_token_id",
        type: "core::integer::u256",
      },
      {
        name: "nft_contract",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "is_locked",
        type: "core::bool",
      },
      {
        name: "locked_at",
        type: "core::integer::u64",
      },
      {
        name: "beneficiary",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "release_conditions_count",
        type: "core::integer::u8",
      },
      {
        name: "fees",
        type: "core::integer::u256",
      },
      {
        name: "tax_liability",
        type: "core::integer::u256",
      },
      {
        name: "last_valuation",
        type: "core::integer::u64",
      },
      {
        name: "valuation_price",
        type: "core::integer::u256",
      },
    ],
  },
  {
    type: "struct",
    name: "inheritx_contracts::base::types::PlanDetails",
    members: [
      {
        name: "plan",
        type: "inheritx_contracts::base::types::InheritancePlan",
      },
      {
        name: "plan_name",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "plan_description",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "beneficiaries",
        type: "core::array::Array::<inheritx_contracts::base::types::Beneficiary>",
      },
      {
        name: "distribution_plan",
        type: "inheritx_contracts::base::types::DistributionPlan",
      },
      {
        name: "escrow_account",
        type: "inheritx_contracts::base::types::EscrowAccount",
      },
    ],
  },
  {
    type: "struct",
    name: "inheritx_contracts::base::types::InactivityMonitor",
    members: [
      {
        name: "wallet_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "threshold",
        type: "core::integer::u64",
      },
      {
        name: "last_activity",
        type: "core::integer::u64",
      },
      {
        name: "beneficiary_email_hash",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "is_active",
        type: "core::bool",
      },
      {
        name: "created_at",
        type: "core::integer::u64",
      },
      {
        name: "triggered_at",
        type: "core::integer::u64",
      },
      {
        name: "plan_id",
        type: "core::integer::u256",
      },
      {
        name: "monitoring_enabled",
        type: "core::bool",
      },
    ],
  },
  {
    type: "struct",
    name: "inheritx_contracts::base::types::PlanDetailsWithCreation",
    members: [
      {
        name: "plan_name",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "plan_description",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "asset_amount",
        type: "core::integer::u256",
      },
      {
        name: "asset_type",
        type: "inheritx_contracts::base::types::AssetType",
      },
      {
        name: "created_at",
        type: "core::integer::u64",
      },
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "beneficiary_count",
        type: "core::integer::u8",
      },
      {
        name: "status",
        type: "inheritx_contracts::base::types::PlanStatus",
      },
      {
        name: "beneficiaries",
        type: "core::array::Array::<inheritx_contracts::base::types::Beneficiary>",
      },
      {
        name: "distribution_method",
        type: "core::integer::u8",
      },
      {
        name: "lump_sum_date",
        type: "core::integer::u64",
      },
      {
        name: "quarterly_percentage",
        type: "core::integer::u8",
      },
      {
        name: "yearly_percentage",
        type: "core::integer::u8",
      },
      {
        name: "monthly_percentage",
        type: "core::integer::u8",
      },
      {
        name: "additional_note",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "claim_code_hash",
        type: "core::byte_array::ByteArray",
      },
    ],
  },
  {
    type: "struct",
    name: "inheritx_contracts::base::types::SecuritySettings",
    members: [
      {
        name: "max_beneficiaries",
        type: "core::integer::u8",
      },
      {
        name: "min_timeframe",
        type: "core::integer::u64",
      },
      {
        name: "max_timeframe",
        type: "core::integer::u64",
      },
      {
        name: "require_guardian",
        type: "core::bool",
      },
      {
        name: "allow_early_execution",
        type: "core::bool",
      },
      {
        name: "max_asset_amount",
        type: "core::integer::u256",
      },
      {
        name: "require_multi_sig",
        type: "core::bool",
      },
      {
        name: "multi_sig_threshold",
        type: "core::integer::u8",
      },
      {
        name: "emergency_timeout",
        type: "core::integer::u64",
      },
    ],
  },
  {
    type: "interface",
    name: "inheritx_contracts::interfaces::iplans::IInheritXPlans",
    items: [
      {
        type: "function",
        name: "create_inheritance_plan",
        inputs: [
          {
            name: "plan_name",
            type: "core::byte_array::ByteArray",
          },
          {
            name: "plan_description",
            type: "core::byte_array::ByteArray",
          },
          {
            name: "beneficiaries",
            type: "core::array::Array::<inheritx_contracts::base::types::BeneficiaryInput>",
          },
          {
            name: "asset_type",
            type: "core::integer::u8",
          },
          {
            name: "asset_amount",
            type: "core::integer::u256",
          },
          {
            name: "distribution_method",
            type: "core::integer::u8",
          },
          {
            name: "lump_sum_date",
            type: "core::integer::u64",
          },
          {
            name: "quarterly_percentage",
            type: "core::integer::u8",
          },
          {
            name: "yearly_percentage",
            type: "core::integer::u8",
          },
          {
            name: "monthly_percentage",
            type: "core::integer::u8",
          },
          {
            name: "additional_note",
            type: "core::byte_array::ByteArray",
          },
          {
            name: "claim_code",
            type: "core::byte_array::ByteArray",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_beneficiary_percentages",
        inputs: [
          {
            name: "plan_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<inheritx_contracts::base::types::BeneficiaryData>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_beneficiaries",
        inputs: [
          {
            name: "plan_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<inheritx_contracts::base::types::Beneficiary>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_plan_count",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_inheritance_plan",
        inputs: [
          {
            name: "plan_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "inheritx_contracts::base::types::PlanDetails",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_escrow_details",
        inputs: [
          {
            name: "plan_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "inheritx_contracts::base::types::EscrowAccount",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_inactivity_monitor",
        inputs: [
          {
            name: "wallet_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "inheritx_contracts::base::types::InactivityMonitor",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_beneficiary_count",
        inputs: [
          {
            name: "basic_info_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_plan_summary",
        inputs: [
          {
            name: "user_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<(core::integer::u256, core::byte_array::ByteArray, core::byte_array::ByteArray, core::integer::u256, inheritx_contracts::base::types::AssetType, core::integer::u64, core::starknet::contract_address::ContractAddress, core::integer::u8, inheritx_contracts::base::types::PlanStatus)>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_plan_info",
        inputs: [
          {
            name: "plan_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "(core::byte_array::ByteArray, core::byte_array::ByteArray, core::integer::u256, inheritx_contracts::base::types::AssetType, core::integer::u64, core::starknet::contract_address::ContractAddress, core::integer::u8, inheritx_contracts::base::types::PlanStatus)",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_plan_by_id",
        inputs: [
          {
            name: "user_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "user_plan_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "inheritx_contracts::base::types::PlanDetailsWithCreation",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_summary",
        inputs: [
          {
            name: "user_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<(core::integer::u256, core::byte_array::ByteArray, core::byte_array::ByteArray, core::integer::u256, inheritx_contracts::base::types::AssetType, core::integer::u64, core::starknet::contract_address::ContractAddress, core::integer::u8, inheritx_contracts::base::types::PlanStatus)>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_all_plans",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<(core::integer::u256, core::byte_array::ByteArray, core::byte_array::ByteArray, core::integer::u256, inheritx_contracts::base::types::AssetType, core::integer::u64, core::starknet::contract_address::ContractAddress, core::integer::u8, inheritx_contracts::base::types::PlanStatus, core::array::Array::<inheritx_contracts::base::types::Beneficiary>)>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "hash_claim_code",
        inputs: [
          {
            name: "code",
            type: "core::byte_array::ByteArray",
          },
        ],
        outputs: [
          {
            type: "core::byte_array::ByteArray",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "edit_plan",
        inputs: [
          {
            name: "plan_id",
            type: "core::integer::u256",
          },
          {
            name: "new_beneficiaries",
            type: "core::array::Array::<inheritx_contracts::base::types::BeneficiaryInput>",
          },
          {
            name: "new_monthly_percentage",
            type: "core::integer::u8",
          },
          {
            name: "new_yearly_percentage",
            type: "core::integer::u8",
          },
          {
            name: "new_quarterly_percentage",
            type: "core::integer::u8",
          },
          {
            name: "new_date",
            type: "core::integer::u64",
          },
          {
            name: "new_amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "approve_tokens_for_deposit",
        inputs: [
          {
            name: "asset_type",
            type: "core::integer::u8",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "deposit_funds_to_plan",
        inputs: [
          {
            name: "plan_id",
            type: "core::integer::u256",
          },
          {
            name: "asset_amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "claim_beneficiary_funds",
        inputs: [
          {
            name: "plan_id",
            type: "core::integer::u256",
          },
          {
            name: "beneficiary_index",
            type: "core::integer::u256",
          },
          {
            name: "claim_code",
            type: "core::byte_array::ByteArray",
          },
          {
            name: "beneficiary_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "check_inactivity_status",
        inputs: [
          {
            name: "plan_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_security_settings",
        inputs: [],
        outputs: [
          {
            type: "inheritx_contracts::base::types::SecuritySettings",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_plan_creation_fee",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_total_amount_needed",
        inputs: [
          {
            name: "asset_amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      {
        name: "admin",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "strk_token",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
    kind: "struct",
    members: [
      {
        name: "class_hash",
        type: "core::starknet::class_hash::ClassHash",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
    kind: "enum",
    variants: [
      {
        name: "Upgraded",
        type: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
        kind: "nested",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_security::pausable::PausableComponent::Paused",
    kind: "struct",
    members: [
      {
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_security::pausable::PausableComponent::Unpaused",
    kind: "struct",
    members: [
      {
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_security::pausable::PausableComponent::Event",
    kind: "enum",
    variants: [
      {
        name: "Paused",
        type: "openzeppelin_security::pausable::PausableComponent::Paused",
        kind: "nested",
      },
      {
        name: "Unpaused",
        type: "openzeppelin_security::pausable::PausableComponent::Unpaused",
        kind: "nested",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::PlanCreated",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "plan_name",
        type: "core::byte_array::ByteArray",
        kind: "data",
      },
      {
        name: "plan_description",
        type: "core::byte_array::ByteArray",
        kind: "data",
      },
      {
        name: "beneficiary_name",
        type: "core::byte_array::ByteArray",
        kind: "data",
      },
      {
        name: "beneficiary_relationship",
        type: "core::byte_array::ByteArray",
        kind: "data",
      },
      {
        name: "beneficiary_email",
        type: "core::byte_array::ByteArray",
        kind: "data",
      },
      {
        name: "asset_type",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "asset_amount",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "distribution_method",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "created_at",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::BasicPlanInfoCreated",
    kind: "struct",
    members: [
      {
        name: "basic_info_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "plan_name",
        type: "core::byte_array::ByteArray",
        kind: "data",
      },
      {
        name: "created_at",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::AssetAllocationSet",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "beneficiary_count",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "total_percentage",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "set_at",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::RulesConditionsSet",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "guardian",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "auto_execute",
        type: "core::bool",
        kind: "data",
      },
      {
        name: "set_at",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "enum",
    name: "inheritx_contracts::base::types::KYCStatus",
    variants: [
      {
        name: "Pending",
        type: "()",
      },
      {
        name: "Approved",
        type: "()",
      },
      {
        name: "Rejected",
        type: "()",
      },
      {
        name: "Unknown",
        type: "()",
      },
    ],
  },
  {
    type: "enum",
    name: "inheritx_contracts::base::types::ComplianceStatus",
    variants: [
      {
        name: "Pending",
        type: "()",
      },
      {
        name: "Compliant",
        type: "()",
      },
      {
        name: "NonCompliant",
        type: "()",
      },
      {
        name: "UnderReview",
        type: "()",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::VerificationCompleted",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "kyc_status",
        type: "inheritx_contracts::base::types::KYCStatus",
        kind: "data",
      },
      {
        name: "compliance_status",
        type: "inheritx_contracts::base::types::ComplianceStatus",
        kind: "data",
      },
      {
        name: "verified_at",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "enum",
    name: "inheritx_contracts::base::types::ValidationStatus",
    variants: [
      {
        name: "Pending",
        type: "()",
      },
      {
        name: "Validating",
        type: "()",
      },
      {
        name: "Valid",
        type: "()",
      },
      {
        name: "Invalid",
        type: "()",
      },
      {
        name: "RequiresReview",
        type: "()",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::PlanPreviewGenerated",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "validation_status",
        type: "inheritx_contracts::base::types::ValidationStatus",
        kind: "data",
      },
      {
        name: "activation_ready",
        type: "core::bool",
        kind: "data",
      },
      {
        name: "generated_at",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::PlanActivated",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "activated_by",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "activated_at",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "enum",
    name: "inheritx_contracts::base::types::PlanCreationStatus",
    variants: [
      {
        name: "BasicInfoCreated",
        type: "()",
      },
      {
        name: "AssetAllocationSet",
        type: "()",
      },
      {
        name: "RulesConditionsSet",
        type: "()",
      },
      {
        name: "VerificationCompleted",
        type: "()",
      },
      {
        name: "PreviewReady",
        type: "()",
      },
      {
        name: "PlanActive",
        type: "()",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::PlanCreationStepCompleted",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "step",
        type: "inheritx_contracts::base::types::PlanCreationStatus",
        kind: "data",
      },
      {
        name: "completed_at",
        type: "core::integer::u64",
        kind: "data",
      },
      {
        name: "completed_by",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "enum",
    name: "inheritx_contracts::base::types::ActivityType",
    variants: [
      {
        name: "PlanCreated",
        type: "()",
      },
      {
        name: "PlanModified",
        type: "()",
      },
      {
        name: "BeneficiaryAdded",
        type: "()",
      },
      {
        name: "BeneficiaryRemoved",
        type: "()",
      },
      {
        name: "PlanExecuted",
        type: "()",
      },
      {
        name: "PlanPaused",
        type: "()",
      },
      {
        name: "PlanCancelled",
        type: "()",
      },
      {
        name: "KYCUploaded",
        type: "()",
      },
      {
        name: "KYCApproved",
        type: "()",
      },
      {
        name: "KYCRejected",
        type: "()",
      },
      {
        name: "AssetLocked",
        type: "()",
      },
      {
        name: "AssetReleased",
        type: "()",
      },
      {
        name: "GuardianChanged",
        type: "()",
      },
      {
        name: "RulesUpdated",
        type: "()",
      },
      {
        name: "VerificationCompleted",
        type: "()",
      },
      {
        name: "Custom",
        type: "()",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::ActivityLogged",
    kind: "struct",
    members: [
      {
        name: "activity_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "user_address",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "activity_type",
        type: "inheritx_contracts::base::types::ActivityType",
        kind: "data",
      },
      {
        name: "timestamp",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::PlanStatusUpdated",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "old_status",
        type: "inheritx_contracts::base::types::PlanStatus",
        kind: "data",
      },
      {
        name: "new_status",
        type: "inheritx_contracts::base::types::PlanStatus",
        kind: "data",
      },
      {
        name: "updated_by",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "updated_at",
        type: "core::integer::u64",
        kind: "data",
      },
      {
        name: "reason",
        type: "core::byte_array::ByteArray",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::BeneficiaryModified",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "beneficiary_address",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "modification_type",
        type: "core::byte_array::ByteArray",
        kind: "data",
      },
      {
        name: "modified_at",
        type: "core::integer::u64",
        kind: "data",
      },
      {
        name: "modified_by",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::DistributionPlanCreated",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "distribution_method",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "total_amount",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "period_amount",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "start_date",
        type: "core::integer::u64",
        kind: "data",
      },
      {
        name: "end_date",
        type: "core::integer::u64",
        kind: "data",
      },
      {
        name: "created_at",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::DistributionExecuted",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "record_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "period",
        type: "core::integer::u64",
        kind: "data",
      },
      {
        name: "amount",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "executed_at",
        type: "core::integer::u64",
        kind: "data",
      },
      {
        name: "beneficiaries_count",
        type: "core::integer::u8",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::DistributionPaused",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "paused_at",
        type: "core::integer::u64",
        kind: "data",
      },
      {
        name: "reason",
        type: "core::byte_array::ByteArray",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::DistributionResumed",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "resumed_at",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::DistributionCancelled",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "cancelled_at",
        type: "core::integer::u64",
        kind: "data",
      },
      {
        name: "reason",
        type: "core::byte_array::ByteArray",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::DisbursementBeneficiaryAdded",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "beneficiary_address",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "percentage",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "monthly_amount",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "added_at",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::DisbursementBeneficiaryRemoved",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "beneficiary_address",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "removed_at",
        type: "core::integer::u64",
        kind: "data",
      },
      {
        name: "removed_by",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::InheritancePlanCreated",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "asset_type",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "amount",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "timeframe",
        type: "core::integer::u64",
        kind: "data",
      },
      {
        name: "beneficiary_count",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "created_at",
        type: "core::integer::u64",
        kind: "data",
      },
      {
        name: "security_level",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "auto_execute",
        type: "core::bool",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::AssetAmountUpdated",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "old_amount",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "new_amount",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "additional_amount",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "fee_amount",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "updated_by",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "updated_at",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::LumpSumDateExtended",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "old_date",
        type: "core::integer::u64",
        kind: "data",
      },
      {
        name: "new_date",
        type: "core::integer::u64",
        kind: "data",
      },
      {
        name: "extended_by",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "extended_at",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::DistributionPercentagesUpdated",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "old_quarterly_percentage",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "new_quarterly_percentage",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "old_yearly_percentage",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "new_yearly_percentage",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "old_monthly_percentage",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "new_monthly_percentage",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "updated_by",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "updated_at",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::BeneficiaryAddedToPlan",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "beneficiary_name",
        type: "core::byte_array::ByteArray",
        kind: "data",
      },
      {
        name: "beneficiary_email",
        type: "core::byte_array::ByteArray",
        kind: "data",
      },
      {
        name: "beneficiary_relationship",
        type: "core::byte_array::ByteArray",
        kind: "data",
      },
      {
        name: "added_by",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "added_at",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::BeneficiaryUpdatedInPlan",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "beneficiary_index",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "old_name",
        type: "core::byte_array::ByteArray",
        kind: "data",
      },
      {
        name: "new_name",
        type: "core::byte_array::ByteArray",
        kind: "data",
      },
      {
        name: "old_email",
        type: "core::byte_array::ByteArray",
        kind: "data",
      },
      {
        name: "new_email",
        type: "core::byte_array::ByteArray",
        kind: "data",
      },
      {
        name: "old_relationship",
        type: "core::byte_array::ByteArray",
        kind: "data",
      },
      {
        name: "new_relationship",
        type: "core::byte_array::ByteArray",
        kind: "data",
      },
      {
        name: "updated_by",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "updated_at",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::BeneficiaryRemovedFromPlan",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "removed_count",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "remaining_count",
        type: "core::integer::u8",
        kind: "data",
      },
      {
        name: "removed_by",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "removed_at",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::BeneficiariesReplaced",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "old_count",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "new_count",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "replaced_by",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "replaced_at",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::FeeCollected",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "beneficiary",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "fee_amount",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "fee_percentage",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "gross_amount",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "net_amount",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "fee_recipient",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "collected_at",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::FundsClaimed",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "beneficiary_index",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "beneficiary_address",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "claim_amount",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "claim_code",
        type: "core::byte_array::ByteArray",
        kind: "data",
      },
      {
        name: "claimed_at",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::base::events::FundsDeposited",
    kind: "struct",
    members: [
      {
        name: "plan_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "amount",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "fee_amount",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "net_amount",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "deposited_by",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "deposited_at",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "inheritx_contracts::core_plans::InheritXPlans::Event",
    kind: "enum",
    variants: [
      {
        name: "UpgradeableEvent",
        type: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
        kind: "flat",
      },
      {
        name: "PausableEvent",
        type: "openzeppelin_security::pausable::PausableComponent::Event",
        kind: "flat",
      },
      {
        name: "PlanCreated",
        type: "inheritx_contracts::base::events::PlanCreated",
        kind: "nested",
      },
      {
        name: "BasicPlanInfoCreated",
        type: "inheritx_contracts::base::events::BasicPlanInfoCreated",
        kind: "nested",
      },
      {
        name: "AssetAllocationSet",
        type: "inheritx_contracts::base::events::AssetAllocationSet",
        kind: "nested",
      },
      {
        name: "RulesConditionsSet",
        type: "inheritx_contracts::base::events::RulesConditionsSet",
        kind: "nested",
      },
      {
        name: "VerificationCompleted",
        type: "inheritx_contracts::base::events::VerificationCompleted",
        kind: "nested",
      },
      {
        name: "PlanPreviewGenerated",
        type: "inheritx_contracts::base::events::PlanPreviewGenerated",
        kind: "nested",
      },
      {
        name: "PlanActivated",
        type: "inheritx_contracts::base::events::PlanActivated",
        kind: "nested",
      },
      {
        name: "PlanCreationStepCompleted",
        type: "inheritx_contracts::base::events::PlanCreationStepCompleted",
        kind: "nested",
      },
      {
        name: "ActivityLogged",
        type: "inheritx_contracts::base::events::ActivityLogged",
        kind: "nested",
      },
      {
        name: "PlanStatusUpdated",
        type: "inheritx_contracts::base::events::PlanStatusUpdated",
        kind: "nested",
      },
      {
        name: "BeneficiaryModified",
        type: "inheritx_contracts::base::events::BeneficiaryModified",
        kind: "nested",
      },
      {
        name: "DistributionPlanCreated",
        type: "inheritx_contracts::base::events::DistributionPlanCreated",
        kind: "nested",
      },
      {
        name: "DistributionExecuted",
        type: "inheritx_contracts::base::events::DistributionExecuted",
        kind: "nested",
      },
      {
        name: "DistributionPaused",
        type: "inheritx_contracts::base::events::DistributionPaused",
        kind: "nested",
      },
      {
        name: "DistributionResumed",
        type: "inheritx_contracts::base::events::DistributionResumed",
        kind: "nested",
      },
      {
        name: "DistributionCancelled",
        type: "inheritx_contracts::base::events::DistributionCancelled",
        kind: "nested",
      },
      {
        name: "DisbursementBeneficiaryAdded",
        type: "inheritx_contracts::base::events::DisbursementBeneficiaryAdded",
        kind: "nested",
      },
      {
        name: "DisbursementBeneficiaryRemoved",
        type: "inheritx_contracts::base::events::DisbursementBeneficiaryRemoved",
        kind: "nested",
      },
      {
        name: "InheritancePlanCreated",
        type: "inheritx_contracts::base::events::InheritancePlanCreated",
        kind: "nested",
      },
      {
        name: "AssetAmountUpdated",
        type: "inheritx_contracts::base::events::AssetAmountUpdated",
        kind: "nested",
      },
      {
        name: "LumpSumDateExtended",
        type: "inheritx_contracts::base::events::LumpSumDateExtended",
        kind: "nested",
      },
      {
        name: "DistributionPercentagesUpdated",
        type: "inheritx_contracts::base::events::DistributionPercentagesUpdated",
        kind: "nested",
      },
      {
        name: "BeneficiaryAddedToPlan",
        type: "inheritx_contracts::base::events::BeneficiaryAddedToPlan",
        kind: "nested",
      },
      {
        name: "BeneficiaryUpdatedInPlan",
        type: "inheritx_contracts::base::events::BeneficiaryUpdatedInPlan",
        kind: "nested",
      },
      {
        name: "BeneficiaryRemovedFromPlan",
        type: "inheritx_contracts::base::events::BeneficiaryRemovedFromPlan",
        kind: "nested",
      },
      {
        name: "BeneficiariesReplaced",
        type: "inheritx_contracts::base::events::BeneficiariesReplaced",
        kind: "nested",
      },
      {
        name: "FeeCollected",
        type: "inheritx_contracts::base::events::FeeCollected",
        kind: "nested",
      },
      {
        name: "FundsClaimed",
        type: "inheritx_contracts::base::events::FundsClaimed",
        kind: "nested",
      },
      {
        name: "FundsDeposited",
        type: "inheritx_contracts::base::events::FundsDeposited",
        kind: "nested",
      },
    ],
  },
];
