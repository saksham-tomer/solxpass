export type Base = {
  version: "0.1.0";
  name: "base";
  instructions: [
    {
      name: "verifyAndStore";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "epochConfig";
          isMut: false;
          isSigner: false;
        },
        {
          name: "epoch";
          isMut: false;
          isSigner: false;
        },
        {
          name: "reclaimProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "storedClaim";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "args";
          type: {
            defined: "VerifyArgs";
          };
        }
      ];
    },
    {
      name: "getStoredClaim";
      accounts: [
        {
          name: "signer";
          isMut: false;
          isSigner: true;
        },
        {
          name: "storedClaim";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "storedClaim";
      type: {
        kind: "struct";
        fields: [
          {
            name: "claimInfo";
            type: {
              defined: "ClaimInfo";
            };
          },
          {
            name: "signedClaim";
            type: {
              defined: "SignedClaim";
            };
          },
          {
            name: "owner";
            type: "publicKey";
          }
        ];
      };
    },
    {
      name: "epoch";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "epochConfig";
            type: "publicKey";
          },
          {
            name: "index";
            type: "u32";
          },
          {
            name: "createdAt";
            type: "i64";
          },
          {
            name: "expiredAt";
            type: "i64";
          },
          {
            name: "minimumWitnessesForClaim";
            type: "u8";
          },
          {
            name: "witnesses";
            type: {
              vec: {
                defined: "Witness";
              };
            };
          }
        ];
      };
    },
    {
      name: "epochConfig";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "createKey";
            type: "publicKey";
          },
          {
            name: "deployer";
            type: "publicKey";
          },
          {
            name: "epochDurationSeconds";
            type: "u64";
          },
          {
            name: "epochIndex";
            type: "u32";
          },
          {
            name: "epochs";
            type: {
              vec: "publicKey";
            };
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "ClaimData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "identifier";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "owner";
            type: "string";
          },
          {
            name: "timestamp";
            type: "u32";
          },
          {
            name: "epochIndex";
            type: "u32";
          }
        ];
      };
    },
    {
      name: "ClaimInfo";
      type: {
        kind: "struct";
        fields: [
          {
            name: "provider";
            type: "string";
          },
          {
            name: "parameters";
            type: "string";
          },
          {
            name: "contextAddress";
            type: "publicKey";
          },
          {
            name: "contextMessage";
            type: "string";
          }
        ];
      };
    },
    {
      name: "SignedClaim";
      type: {
        kind: "struct";
        fields: [
          {
            name: "claimData";
            type: {
              defined: "ClaimData";
            };
          },
          {
            name: "signatures";
            type: {
              vec: {
                array: ["u8", 65];
              };
            };
          }
        ];
      };
    },
    {
      name: "VerifyArgs";
      type: {
        kind: "struct";
        fields: [
          {
            name: "claimInfo";
            type: {
              defined: "ClaimInfo";
            };
          },
          {
            name: "signedClaim";
            type: {
              defined: "SignedClaim";
            };
          }
        ];
      };
    },
    {
      name: "Witness";
      type: {
        kind: "struct";
        fields: [
          {
            name: "address";
            type: "string";
          },
          {
            name: "url";
            type: "string";
          }
        ];
      };
    }
  ];
};

export const IDL: Base = {
  version: "0.1.0",
  name: "base",
  instructions: [
    {
      name: "verifyAndStore",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "epochConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "epoch",
          isMut: false,
          isSigner: false,
        },
        {
          name: "reclaimProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "storedClaim",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: "VerifyArgs",
          },
        },
      ],
    },
    {
      name: "getStoredClaim",
      accounts: [
        {
          name: "signer",
          isMut: false,
          isSigner: true,
        },
        {
          name: "storedClaim",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "storedClaim",
      type: {
        kind: "struct",
        fields: [
          {
            name: "claimInfo",
            type: {
              defined: "ClaimInfo",
            },
          },
          {
            name: "signedClaim",
            type: {
              defined: "SignedClaim",
            },
          },
          {
            name: "owner",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "epoch",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "epochConfig",
            type: "publicKey",
          },
          {
            name: "index",
            type: "u32",
          },
          {
            name: "createdAt",
            type: "i64",
          },
          {
            name: "expiredAt",
            type: "i64",
          },
          {
            name: "minimumWitnessesForClaim",
            type: "u8",
          },
          {
            name: "witnesses",
            type: {
              vec: {
                defined: "Witness",
              },
            },
          },
        ],
      },
    },
    {
      name: "epochConfig",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "createKey",
            type: "publicKey",
          },
          {
            name: "deployer",
            type: "publicKey",
          },
          {
            name: "epochDurationSeconds",
            type: "u64",
          },
          {
            name: "epochIndex",
            type: "u32",
          },
          {
            name: "epochs",
            type: {
              vec: "publicKey",
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "ClaimData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "identifier",
            type: {
              array: ["u8", 32],
            },
          },
          {
            name: "owner",
            type: "string",
          },
          {
            name: "timestamp",
            type: "u32",
          },
          {
            name: "epochIndex",
            type: "u32",
          },
        ],
      },
    },
    {
      name: "ClaimInfo",
      type: {
        kind: "struct",
        fields: [
          {
            name: "provider",
            type: "string",
          },
          {
            name: "parameters",
            type: "string",
          },
          {
            name: "contextAddress",
            type: "publicKey",
          },
          {
            name: "contextMessage",
            type: "string",
          },
        ],
      },
    },
    {
      name: "SignedClaim",
      type: {
        kind: "struct",
        fields: [
          {
            name: "claimData",
            type: {
              defined: "ClaimData",
            },
          },
          {
            name: "signatures",
            type: {
              vec: {
                array: ["u8", 65],
              },
            },
          },
        ],
      },
    },
    {
      name: "VerifyArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "claimInfo",
            type: {
              defined: "ClaimInfo",
            },
          },
          {
            name: "signedClaim",
            type: {
              defined: "SignedClaim",
            },
          },
        ],
      },
    },
    {
      name: "Witness",
      type: {
        kind: "struct",
        fields: [
          {
            name: "address",
            type: "string",
          },
          {
            name: "url",
            type: "string",
          },
        ],
      },
    },
  ],
};
