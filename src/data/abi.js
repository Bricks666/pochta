export const abi = [
	{
		inputs: [],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "user",
				type: "address",
			},
		],
		name: "changeInfo",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "receiver",
				type: "address",
			},
			{
				indexed: false,
				internalType: "enum Packages.PackageStatus",
				name: "newStatus",
				type: "uint8",
			},
		],
		name: "changePackageStatus",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "address",
				name: "sender",
				type: "address",
			},
			{
				indexed: false,
				internalType: "address",
				name: "receiver",
				type: "address",
			},
		],
		name: "finishTransfer",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "receiver",
				type: "address",
			},
		],
		name: "newPackage",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "receiver",
				type: "address",
			},
		],
		name: "newTransfer",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "user",
				type: "address",
			},
		],
		name: "newUser",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
		],
		name: "acceptPackage",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
		],
		name: "acceptTransfer",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "AddressToAdmin",
				type: "address",
			},
		],
		name: "addAdmin",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "sender",
						type: "address",
					},
					{
						internalType: "address",
						name: "receiver",
						type: "address",
					},
				],
				internalType: "struct Packages.PrePackagePresonalData",
				name: "personalData",
				type: "tuple",
			},
			{
				components: [
					{
						internalType: "enum Packages.TypePackage",
						name: "typePackage",
						type: "uint8",
					},
					{
						internalType: "enum Packages.PackageClass",
						name: "packageClass",
						type: "uint8",
					},
				],
				internalType: "struct Packages.PackageType",
				name: "packageType",
				type: "tuple",
			},
			{
				components: [
					{
						internalType: "uint256",
						name: "weight",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "deliveryPrice",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "valuePackage",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "deliveryTime",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "allPrice",
						type: "uint256",
					},
				],
				internalType: "struct Packages.PackageDelivery",
				name: "packageDelivery",
				type: "tuple",
			},
		],
		name: "addPackage",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "Address",
				type: "address",
			},
			{
				internalType: "string",
				name: "idMailPost",
				type: "string",
			},
		],
		name: "addPostman",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "admins",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
		],
		name: "cancelPackage",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
		],
		name: "cancelTransfer",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "Address",
				type: "address",
			},
			{
				internalType: "string",
				name: "newIdMailPost",
				type: "string",
			},
		],
		name: "changeIDMailPost",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "homeAddress",
				type: "string",
			},
			{
				internalType: "string",
				name: "fio",
				type: "string",
			},
			{
				internalType: "bool",
				name: "acceptMail",
				type: "bool",
			},
		],
		name: "changeUserInfo",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "receiver",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "liveTime",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "timeSend",
				type: "uint256",
			},
		],
		name: "createTransfer",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "Address",
				type: "address",
			},
		],
		name: "delPostman",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "getAdmins",
		outputs: [
			{
				internalType: "address[]",
				name: "",
				type: "address[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getPackages",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "id",
						type: "uint256",
					},
					{
						internalType: "string",
						name: "trackNumber",
						type: "string",
					},
					{
						components: [
							{
								internalType: "address",
								name: "sender",
								type: "address",
							},
							{
								internalType: "address",
								name: "receiver",
								type: "address",
							},
							{
								internalType: "string",
								name: "addressSender",
								type: "string",
							},
							{
								internalType: "string",
								name: "addressReceiver",
								type: "string",
							},
						],
						internalType: "struct Packages.PackagePresonalData",
						name: "personalData",
						type: "tuple",
					},
					{
						components: [
							{
								internalType: "enum Packages.TypePackage",
								name: "typePackage",
								type: "uint8",
							},
							{
								internalType: "enum Packages.PackageClass",
								name: "packageClass",
								type: "uint8",
							},
						],
						internalType: "struct Packages.PackageType",
						name: "packageType",
						type: "tuple",
					},
					{
						components: [
							{
								internalType: "uint256",
								name: "weight",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "deliveryPrice",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "valuePackage",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "deliveryTime",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "allPrice",
								type: "uint256",
							},
						],
						internalType: "struct Packages.PackageDelivery",
						name: "delivery",
						type: "tuple",
					},
					{
						internalType: "enum Packages.PackageStatus",
						name: "status",
						type: "uint8",
					},
				],
				internalType: "struct Packages.Package[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getTransfers",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "id",
						type: "uint256",
					},
					{
						internalType: "address",
						name: "sender",
						type: "address",
					},
					{
						internalType: "address",
						name: "receiver",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "value",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "liveTime",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "timeSend",
						type: "uint256",
					},
					{
						internalType: "bool",
						name: "isFinish",
						type: "bool",
					},
				],
				internalType: "struct Transfers.Transfer[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "user",
				type: "address",
			},
		],
		name: "getUser",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "Address",
						type: "address",
					},
					{
						internalType: "string",
						name: "homeAddress",
						type: "string",
					},
					{
						internalType: "string",
						name: "FIO",
						type: "string",
					},
					{
						internalType: "enum Users.Role",
						name: "role",
						type: "uint8",
					},
					{
						internalType: "bool",
						name: "acceptMail",
						type: "bool",
					},
					{
						internalType: "string",
						name: "idMailPost",
						type: "string",
					},
				],
				internalType: "struct Users.User",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getUsers",
		outputs: [
			{
				internalType: "address[]",
				name: "",
				type: "address[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "packages",
		outputs: [
			{
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "trackNumber",
				type: "string",
			},
			{
				components: [
					{
						internalType: "address",
						name: "sender",
						type: "address",
					},
					{
						internalType: "address",
						name: "receiver",
						type: "address",
					},
					{
						internalType: "string",
						name: "addressSender",
						type: "string",
					},
					{
						internalType: "string",
						name: "addressReceiver",
						type: "string",
					},
				],
				internalType: "struct Packages.PackagePresonalData",
				name: "personalData",
				type: "tuple",
			},
			{
				components: [
					{
						internalType: "enum Packages.TypePackage",
						name: "typePackage",
						type: "uint8",
					},
					{
						internalType: "enum Packages.PackageClass",
						name: "packageClass",
						type: "uint8",
					},
				],
				internalType: "struct Packages.PackageType",
				name: "packageType",
				type: "tuple",
			},
			{
				components: [
					{
						internalType: "uint256",
						name: "weight",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "deliveryPrice",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "valuePackage",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "deliveryTime",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "allPrice",
						type: "uint256",
					},
				],
				internalType: "struct Packages.PackageDelivery",
				name: "delivery",
				type: "tuple",
			},
			{
				internalType: "enum Packages.PackageStatus",
				name: "status",
				type: "uint8",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
		],
		name: "payPackage",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "homeAddress",
				type: "string",
			},
			{
				internalType: "string",
				name: "FIO",
				type: "string",
			},
		],
		name: "registration",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "transfers",
		outputs: [
			{
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "sender",
				type: "address",
			},
			{
				internalType: "address",
				name: "receiver",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "liveTime",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "timeSend",
				type: "uint256",
			},
			{
				internalType: "bool",
				name: "isFinish",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		name: "users",
		outputs: [
			{
				internalType: "address",
				name: "Address",
				type: "address",
			},
			{
				internalType: "string",
				name: "homeAddress",
				type: "string",
			},
			{
				internalType: "string",
				name: "FIO",
				type: "string",
			},
			{
				internalType: "enum Users.Role",
				name: "role",
				type: "uint8",
			},
			{
				internalType: "bool",
				name: "acceptMail",
				type: "bool",
			},
			{
				internalType: "string",
				name: "idMailPost",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "usersAddress",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
];
