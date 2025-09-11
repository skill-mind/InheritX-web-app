import { Abi } from "starknet";

export const InheritXAbi: Abi = [
  {
    name: "InheritXPlans",
    type: "impl",
    interface_name: "inheritx_contracts::interfaces::iplans::IInheritXPlans",
  },
  {
    name: "core::integer::u256",
    type: "struct",
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
    name: "core::byte_array::ByteArray",
    type: "struct",
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
    name: "core::bool",
    type: "enum",
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
    name: "inheritx_contracts::base::types::BeneficiaryData",
    type: "struct",
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
    name: "inheritx_contracts::base::types::KYCStatus",
    type: "enum",
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
    name: "inheritx_contracts::base::types::Beneficiary",
    type: "struct",
    members: [
      {
        name: "address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "email_hash",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "percentage",
        type: "core::integer::u8",
      },
      {
        name: "has_claimed",
        type: "core::bool",
      },
      {
        name: "claimed_amount",
        type: "core::integer::u256",
      },
      {
        name: "claim_code_hash",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "added_at",
        type: "core::integer::u64",
      },
      {
        name: "kyc_status",
        type: "inheritx_contracts::base::types::KYCStatus",
      },
      {
        name: "relationship",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "age",
        type: "core::integer::u8",
      },
      {
        name: "is_minor",
        type: "core::bool",
      },
    ],
  },
  {
    name: "inheritx_contracts::base::types::AssetType",
    type: "enum",
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
    name: "inheritx_contracts::base::types::PlanStatus",
    type: "enum",
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
    name: "inheritx_contracts::base::types::InheritancePlan",
    type: "struct",
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
    name: "inheritx_contracts::base::types::EscrowAccount",
    type: "struct",
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
    name: "inheritx_contracts::base::types::InactivityMonitor",
    type: "struct",
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
    name: "inheritx_contracts::base::types::BasicDistributionSchedule",
    type: "struct",
    members: [
      {
        name: "phase",
        type: "core::integer::u8",
      },
      {
        name: "amount",
        type: "core::integer::u256",
      },
      {
        name: "trigger_time",
        type: "core::integer::u64",
      },
      {
        name: "milestone",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "is_executed",
        type: "core::bool",
      },
      {
        name: "executed_at",
        type: "core::integer::u64",
      },
    ],
  },
  {
    name: "inheritx_contracts::base::types::AssetAllocation",
    type: "struct",
    members: [
      {
        name: "beneficiary_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "percentage",
        type: "core::integer::u8",
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
        name: "token_address",
        type: "core::starknet::contract_address::ContractAddress",
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
        name: "distribution_schedule",
        type: "inheritx_contracts::base::types::BasicDistributionSchedule",
      },
      {
        name: "special_conditions_count",
        type: "core::integer::u8",
      },
    ],
  },
  {
    name: "inheritx_contracts::base::types::DisbursementBeneficiary",
    type: "struct",
    members: [
      {
        name: "beneficiary_id",
        type: "core::integer::u256",
      },
      {
        name: "plan_id",
        type: "core::integer::u256",
      },
      {
        name: "address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "percentage",
        type: "core::integer::u8",
      },
      {
        name: "monthly_amount",
        type: "core::integer::u256",
      },
      {
        name: "total_received",
        type: "core::integer::u256",
      },
      {
        name: "last_disbursement",
        type: "core::integer::u64",
      },
      {
        name: "is_active",
        type: "core::bool",
      },
    ],
  },
  {
    name: "inheritx_contracts::base::types::DisbursementStatus",
    type: "enum",
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
    name: "inheritx_contracts::base::types::MonthlyDisbursementPlan",
    type: "struct",
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
        name: "monthly_amount",
        type: "core::integer::u256",
      },
      {
        name: "start_month",
        type: "core::integer::u64",
      },
      {
        name: "end_month",
        type: "core::integer::u64",
      },
      {
        name: "total_months",
        type: "core::integer::u32",
      },
      {
        name: "completed_months",
        type: "core::integer::u32",
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
    ],
  },
  {
    name: "inheritx_contracts::base::types::SecuritySettings",
    type: "struct",
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
    name: "inheritx_contracts::interfaces::iplans::IInheritXPlans",
    type: "interface",
    items: [
      {
        name: "create_inheritance_plan",
        type: "function",
        inputs: [
          {
            name: "beneficiaries",
            type: "core::array::Array::<core::starknet::contract_address::ContractAddress>",
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
            name: "guardian",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "encrypted_details",
            type: "core::byte_array::ByteArray",
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
            name: "emergency_contacts",
            type: "core::array::Array::<core::starknet::contract_address::ContractAddress>",
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
        name: "create_inheritance_plan_with_percentages",
        type: "function",
        inputs: [
          {
            name: "beneficiary_data",
            type: "core::array::Array::<inheritx_contracts::base::types::BeneficiaryData>",
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
            name: "guardian",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "encrypted_details",
            type: "core::byte_array::ByteArray",
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
            name: "emergency_contacts",
            type: "core::array::Array::<core::starknet::contract_address::ContractAddress>",
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
        name: "add_beneficiary_to_plan",
        type: "function",
        inputs: [
          {
            name: "plan_id",
            type: "core::integer::u256",
          },
          {
            name: "beneficiary",
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
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "remove_beneficiary_from_plan",
        type: "function",
        inputs: [
          {
            name: "plan_id",
            type: "core::integer::u256",
          },
          {
            name: "beneficiary",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "reason",
            type: "core::byte_array::ByteArray",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "update_beneficiary_percentages",
        type: "function",
        inputs: [
          {
            name: "plan_id",
            type: "core::integer::u256",
          },
          {
            name: "beneficiary_data",
            type: "core::array::Array::<inheritx_contracts::base::types::BeneficiaryData>",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "get_beneficiary_percentages",
        type: "function",
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
        name: "get_beneficiaries",
        type: "function",
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
        name: "get_plan_count",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_inheritance_plan",
        type: "function",
        inputs: [
          {
            name: "plan_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "inheritx_contracts::base::types::InheritancePlan",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_escrow_details",
        type: "function",
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
        name: "get_inactivity_monitor",
        type: "function",
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
        name: "get_beneficiary_count",
        type: "function",
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
        name: "create_plan_basic_info",
        type: "function",
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
            name: "owner_email_hash",
            type: "core::byte_array::ByteArray",
          },
          {
            name: "initial_beneficiary",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "initial_beneficiary_email",
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
        name: "set_asset_allocation",
        type: "function",
        inputs: [
          {
            name: "basic_info_id",
            type: "core::integer::u256",
          },
          {
            name: "beneficiaries",
            type: "core::array::Array::<inheritx_contracts::base::types::Beneficiary>",
          },
          {
            name: "asset_allocations",
            type: "core::array::Array::<inheritx_contracts::base::types::AssetAllocation>",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "mark_rules_conditions_set",
        type: "function",
        inputs: [
          {
            name: "basic_info_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "mark_verification_completed",
        type: "function",
        inputs: [
          {
            name: "basic_info_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "mark_preview_ready",
        type: "function",
        inputs: [
          {
            name: "basic_info_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "activate_inheritance_plan",
        type: "function",
        inputs: [
          {
            name: "basic_info_id",
            type: "core::integer::u256",
          },
          {
            name: "activation_confirmation",
            type: "core::byte_array::ByteArray",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "extend_plan_timeframe",
        type: "function",
        inputs: [
          {
            name: "plan_id",
            type: "core::integer::u256",
          },
          {
            name: "additional_time",
            type: "core::integer::u64",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "update_plan_parameters",
        type: "function",
        inputs: [
          {
            name: "plan_id",
            type: "core::integer::u256",
          },
          {
            name: "new_security_level",
            type: "core::integer::u8",
          },
          {
            name: "new_auto_execute",
            type: "core::bool",
          },
          {
            name: "new_guardian",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "update_inactivity_threshold",
        type: "function",
        inputs: [
          {
            name: "plan_id",
            type: "core::integer::u256",
          },
          {
            name: "new_threshold",
            type: "core::integer::u64",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "create_monthly_disbursement_plan",
        type: "function",
        inputs: [
          {
            name: "total_amount",
            type: "core::integer::u256",
          },
          {
            name: "monthly_amount",
            type: "core::integer::u256",
          },
          {
            name: "start_month",
            type: "core::integer::u64",
          },
          {
            name: "end_month",
            type: "core::integer::u64",
          },
          {
            name: "beneficiaries",
            type: "core::array::Array::<inheritx_contracts::base::types::DisbursementBeneficiary>",
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
        name: "execute_monthly_disbursement",
        type: "function",
        inputs: [
          {
            name: "plan_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "pause_monthly_disbursement",
        type: "function",
        inputs: [
          {
            name: "plan_id",
            type: "core::integer::u256",
          },
          {
            name: "reason",
            type: "core::byte_array::ByteArray",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "resume_monthly_disbursement",
        type: "function",
        inputs: [
          {
            name: "plan_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "get_monthly_disbursement_status",
        type: "function",
        inputs: [
          {
            name: "plan_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "inheritx_contracts::base::types::MonthlyDisbursementPlan",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "create_inactivity_monitor",
        type: "function",
        inputs: [
          {
            name: "wallet_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "threshold",
            type: "core::integer::u64",
          },
          {
            name: "beneficiary_email_hash",
            type: "core::byte_array::ByteArray",
          },
          {
            name: "plan_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "update_wallet_activity",
        type: "function",
        inputs: [
          {
            name: "wallet_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "check_inactivity_status",
        type: "function",
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
        name: "get_security_settings",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "inheritx_contracts::base::types::SecuritySettings",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "update_security_settings",
        type: "function",
        inputs: [
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
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    name: "constructor",
    type: "constructor",
    inputs: [
      {
        name: "admin",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "strk_token",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "usdt_token",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "usdc_token",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    kind: "struct",
    name: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
    type: "event",
    members: [
      {
        kind: "data",
        name: "class_hash",
        type: "core::starknet::class_hash::ClassHash",
      },
    ],
  },
  {
    kind: "enum",
    name: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "Upgraded",
        type: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
      },
    ],
  },
  {
    kind: "struct",
    name: "openzeppelin_security::pausable::PausableComponent::Paused",
    type: "event",
    members: [
      {
        kind: "data",
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    kind: "struct",
    name: "openzeppelin_security::pausable::PausableComponent::Unpaused",
    type: "event",
    members: [
      {
        kind: "data",
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    kind: "enum",
    name: "openzeppelin_security::pausable::PausableComponent::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "Paused",
        type: "openzeppelin_security::pausable::PausableComponent::Paused",
      },
      {
        kind: "nested",
        name: "Unpaused",
        type: "openzeppelin_security::pausable::PausableComponent::Unpaused",
      },
    ],
  },
  {
    kind: "struct",
    name: "inheritx_contracts::base::events::BasicPlanInfoCreated",
    type: "event",
    members: [
      {
        kind: "data",
        name: "basic_info_id",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "plan_name",
        type: "core::byte_array::ByteArray",
      },
      {
        kind: "data",
        name: "created_at",
        type: "core::integer::u64",
      },
    ],
  },
  {
    kind: "struct",
    name: "inheritx_contracts::base::events::AssetAllocationSet",
    type: "event",
    members: [
      {
        kind: "data",
        name: "plan_id",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "beneficiary_count",
        type: "core::integer::u8",
      },
      {
        kind: "data",
        name: "total_percentage",
        type: "core::integer::u8",
      },
      {
        kind: "data",
        name: "set_at",
        type: "core::integer::u64",
      },
    ],
  },
  {
    kind: "struct",
    name: "inheritx_contracts::base::events::RulesConditionsSet",
    type: "event",
    members: [
      {
        kind: "data",
        name: "plan_id",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "guardian",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "auto_execute",
        type: "core::bool",
      },
      {
        kind: "data",
        name: "set_at",
        type: "core::integer::u64",
      },
    ],
  },
  {
    name: "inheritx_contracts::base::types::ComplianceStatus",
    type: "enum",
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
    kind: "struct",
    name: "inheritx_contracts::base::events::VerificationCompleted",
    type: "event",
    members: [
      {
        kind: "data",
        name: "plan_id",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "kyc_status",
        type: "inheritx_contracts::base::types::KYCStatus",
      },
      {
        kind: "data",
        name: "compliance_status",
        type: "inheritx_contracts::base::types::ComplianceStatus",
      },
      {
        kind: "data",
        name: "verified_at",
        type: "core::integer::u64",
      },
    ],
  },
  {
    name: "inheritx_contracts::base::types::ValidationStatus",
    type: "enum",
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
    kind: "struct",
    name: "inheritx_contracts::base::events::PlanPreviewGenerated",
    type: "event",
    members: [
      {
        kind: "data",
        name: "plan_id",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "validation_status",
        type: "inheritx_contracts::base::types::ValidationStatus",
      },
      {
        kind: "data",
        name: "activation_ready",
        type: "core::bool",
      },
      {
        kind: "data",
        name: "generated_at",
        type: "core::integer::u64",
      },
    ],
  },
  {
    kind: "struct",
    name: "inheritx_contracts::base::events::PlanActivated",
    type: "event",
    members: [
      {
        kind: "data",
        name: "plan_id",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "activated_by",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "activated_at",
        type: "core::integer::u64",
      },
    ],
  },
  {
    name: "inheritx_contracts::base::types::PlanCreationStatus",
    type: "enum",
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
    kind: "struct",
    name: "inheritx_contracts::base::events::PlanCreationStepCompleted",
    type: "event",
    members: [
      {
        kind: "data",
        name: "plan_id",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "step",
        type: "inheritx_contracts::base::types::PlanCreationStatus",
      },
      {
        kind: "data",
        name: "completed_at",
        type: "core::integer::u64",
      },
      {
        kind: "data",
        name: "completed_by",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    name: "inheritx_contracts::base::types::ActivityType",
    type: "enum",
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
    kind: "struct",
    name: "inheritx_contracts::base::events::ActivityLogged",
    type: "event",
    members: [
      {
        kind: "data",
        name: "activity_id",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "plan_id",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "user_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "activity_type",
        type: "inheritx_contracts::base::types::ActivityType",
      },
      {
        kind: "data",
        name: "timestamp",
        type: "core::integer::u64",
      },
    ],
  },
  {
    kind: "struct",
    name: "inheritx_contracts::base::events::PlanStatusUpdated",
    type: "event",
    members: [
      {
        kind: "data",
        name: "plan_id",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "old_status",
        type: "inheritx_contracts::base::types::PlanStatus",
      },
      {
        kind: "data",
        name: "new_status",
        type: "inheritx_contracts::base::types::PlanStatus",
      },
      {
        kind: "data",
        name: "updated_by",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "updated_at",
        type: "core::integer::u64",
      },
      {
        kind: "data",
        name: "reason",
        type: "core::byte_array::ByteArray",
      },
    ],
  },
  {
    kind: "struct",
    name: "inheritx_contracts::base::events::BeneficiaryModified",
    type: "event",
    members: [
      {
        kind: "data",
        name: "plan_id",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "beneficiary_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "modification_type",
        type: "core::byte_array::ByteArray",
      },
      {
        kind: "data",
        name: "modified_at",
        type: "core::integer::u64",
      },
      {
        kind: "data",
        name: "modified_by",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    kind: "struct",
    name: "inheritx_contracts::base::events::MonthlyDisbursementPlanCreated",
    type: "event",
    members: [
      {
        kind: "data",
        name: "plan_id",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "total_amount",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "monthly_amount",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "start_month",
        type: "core::integer::u64",
      },
      {
        kind: "data",
        name: "end_month",
        type: "core::integer::u64",
      },
      {
        kind: "data",
        name: "created_at",
        type: "core::integer::u64",
      },
    ],
  },
  {
    kind: "struct",
    name: "inheritx_contracts::base::events::MonthlyDisbursementExecuted",
    type: "event",
    members: [
      {
        kind: "data",
        name: "disbursement_id",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "plan_id",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "month",
        type: "core::integer::u64",
      },
      {
        kind: "data",
        name: "amount",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "beneficiaries_count",
        type: "core::integer::u8",
      },
      {
        kind: "data",
        name: "executed_at",
        type: "core::integer::u64",
      },
      {
        kind: "data",
        name: "transaction_hash",
        type: "core::byte_array::ByteArray",
      },
    ],
  },
  {
    kind: "struct",
    name: "inheritx_contracts::base::events::MonthlyDisbursementPaused",
    type: "event",
    members: [
      {
        kind: "data",
        name: "plan_id",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "paused_at",
        type: "core::integer::u64",
      },
      {
        kind: "data",
        name: "paused_by",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "reason",
        type: "core::byte_array::ByteArray",
      },
    ],
  },
  {
    kind: "struct",
    name: "inheritx_contracts::base::events::MonthlyDisbursementResumed",
    type: "event",
    members: [
      {
        kind: "data",
        name: "plan_id",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "resumed_at",
        type: "core::integer::u64",
      },
      {
        kind: "data",
        name: "resumed_by",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    kind: "struct",
    name: "inheritx_contracts::base::events::MonthlyDisbursementCancelled",
    type: "event",
    members: [
      {
        kind: "data",
        name: "plan_id",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "cancelled_at",
        type: "core::integer::u64",
      },
      {
        kind: "data",
        name: "cancelled_by",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "reason",
        type: "core::byte_array::ByteArray",
      },
    ],
  },
  {
    kind: "struct",
    name: "inheritx_contracts::base::events::DisbursementBeneficiaryAdded",
    type: "event",
    members: [
      {
        kind: "data",
        name: "plan_id",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "beneficiary_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "percentage",
        type: "core::integer::u8",
      },
      {
        kind: "data",
        name: "monthly_amount",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "added_at",
        type: "core::integer::u64",
      },
    ],
  },
  {
    kind: "struct",
    name: "inheritx_contracts::base::events::DisbursementBeneficiaryRemoved",
    type: "event",
    members: [
      {
        kind: "data",
        name: "plan_id",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "beneficiary_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "removed_at",
        type: "core::integer::u64",
      },
      {
        kind: "data",
        name: "removed_by",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    kind: "struct",
    name: "inheritx_contracts::base::events::InheritancePlanCreated",
    type: "event",
    members: [
      {
        kind: "data",
        name: "plan_id",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "asset_type",
        type: "core::integer::u8",
      },
      {
        kind: "data",
        name: "amount",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "timeframe",
        type: "core::integer::u64",
      },
      {
        kind: "data",
        name: "beneficiary_count",
        type: "core::integer::u8",
      },
      {
        kind: "data",
        name: "created_at",
        type: "core::integer::u64",
      },
      {
        kind: "data",
        name: "security_level",
        type: "core::integer::u8",
      },
      {
        kind: "data",
        name: "auto_execute",
        type: "core::bool",
      },
    ],
  },
  {
    kind: "struct",
    name: "inheritx_contracts::base::events::PlanTimeframeExtended",
    type: "event",
    members: [
      {
        kind: "data",
        name: "plan_id",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "extended_by",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "additional_time",
        type: "core::integer::u64",
      },
      {
        kind: "data",
        name: "new_active_date",
        type: "core::integer::u64",
      },
      {
        kind: "data",
        name: "extended_at",
        type: "core::integer::u64",
      },
    ],
  },
  {
    kind: "struct",
    name: "inheritx_contracts::base::events::PlanParametersUpdated",
    type: "event",
    members: [
      {
        kind: "data",
        name: "plan_id",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "updated_by",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "old_security_level",
        type: "core::integer::u8",
      },
      {
        kind: "data",
        name: "new_security_level",
        type: "core::integer::u8",
      },
      {
        kind: "data",
        name: "old_auto_execute",
        type: "core::bool",
      },
      {
        kind: "data",
        name: "new_auto_execute",
        type: "core::bool",
      },
      {
        kind: "data",
        name: "old_guardian",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "new_guardian",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "updated_at",
        type: "core::integer::u64",
      },
    ],
  },
  {
    kind: "struct",
    name: "inheritx_contracts::base::events::InactivityThresholdUpdated",
    type: "event",
    members: [
      {
        kind: "data",
        name: "plan_id",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "updated_by",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "old_threshold",
        type: "core::integer::u64",
      },
      {
        kind: "data",
        name: "new_threshold",
        type: "core::integer::u64",
      },
      {
        kind: "data",
        name: "updated_at",
        type: "core::integer::u64",
      },
    ],
  },
  {
    kind: "enum",
    name: "inheritx_contracts::core_plans::InheritXPlans::Event",
    type: "event",
    variants: [
      {
        kind: "flat",
        name: "UpgradeableEvent",
        type: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
      },
      {
        kind: "flat",
        name: "PausableEvent",
        type: "openzeppelin_security::pausable::PausableComponent::Event",
      },
      {
        kind: "nested",
        name: "BasicPlanInfoCreated",
        type: "inheritx_contracts::base::events::BasicPlanInfoCreated",
      },
      {
        kind: "nested",
        name: "AssetAllocationSet",
        type: "inheritx_contracts::base::events::AssetAllocationSet",
      },
      {
        kind: "nested",
        name: "RulesConditionsSet",
        type: "inheritx_contracts::base::events::RulesConditionsSet",
      },
      {
        kind: "nested",
        name: "VerificationCompleted",
        type: "inheritx_contracts::base::events::VerificationCompleted",
      },
      {
        kind: "nested",
        name: "PlanPreviewGenerated",
        type: "inheritx_contracts::base::events::PlanPreviewGenerated",
      },
      {
        kind: "nested",
        name: "PlanActivated",
        type: "inheritx_contracts::base::events::PlanActivated",
      },
      {
        kind: "nested",
        name: "PlanCreationStepCompleted",
        type: "inheritx_contracts::base::events::PlanCreationStepCompleted",
      },
      {
        kind: "nested",
        name: "ActivityLogged",
        type: "inheritx_contracts::base::events::ActivityLogged",
      },
      {
        kind: "nested",
        name: "PlanStatusUpdated",
        type: "inheritx_contracts::base::events::PlanStatusUpdated",
      },
      {
        kind: "nested",
        name: "BeneficiaryModified",
        type: "inheritx_contracts::base::events::BeneficiaryModified",
      },
      {
        kind: "nested",
        name: "MonthlyDisbursementPlanCreated",
        type: "inheritx_contracts::base::events::MonthlyDisbursementPlanCreated",
      },
      {
        kind: "nested",
        name: "MonthlyDisbursementExecuted",
        type: "inheritx_contracts::base::events::MonthlyDisbursementExecuted",
      },
      {
        kind: "nested",
        name: "MonthlyDisbursementPaused",
        type: "inheritx_contracts::base::events::MonthlyDisbursementPaused",
      },
      {
        kind: "nested",
        name: "MonthlyDisbursementResumed",
        type: "inheritx_contracts::base::events::MonthlyDisbursementResumed",
      },
      {
        kind: "nested",
        name: "MonthlyDisbursementCancelled",
        type: "inheritx_contracts::base::events::MonthlyDisbursementCancelled",
      },
      {
        kind: "nested",
        name: "DisbursementBeneficiaryAdded",
        type: "inheritx_contracts::base::events::DisbursementBeneficiaryAdded",
      },
      {
        kind: "nested",
        name: "DisbursementBeneficiaryRemoved",
        type: "inheritx_contracts::base::events::DisbursementBeneficiaryRemoved",
      },
      {
        kind: "nested",
        name: "InheritancePlanCreated",
        type: "inheritx_contracts::base::events::InheritancePlanCreated",
      },
      {
        kind: "nested",
        name: "PlanTimeframeExtended",
        type: "inheritx_contracts::base::events::PlanTimeframeExtended",
      },
      {
        kind: "nested",
        name: "PlanParametersUpdated",
        type: "inheritx_contracts::base::events::PlanParametersUpdated",
      },
      {
        kind: "nested",
        name: "InactivityThresholdUpdated",
        type: "inheritx_contracts::base::events::InactivityThresholdUpdated",
      },
    ],
  },
];
