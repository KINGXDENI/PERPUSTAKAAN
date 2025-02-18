const swaggerJsDoc = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "Perpustakaan API",
    description: "API untuk mengelola data members, books, dan transactions dalam sistem perpustakaan."
  },
  servers: [
    {
      url: "http://localhost:6666",
      description: "Local development server"
    },
    {
      url: "https://perpustakaan.dibo.biz.id",
      description: "Production server"
    }
  ],
  basePath: "/api",
  paths: {
    "/members": {
      get: {
        summary: "Dapatkan semua members",
        responses: {
          200: {
            description: "Berhasil mendapatkan daftar members",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/Member"
              }
            }
          }
        }
      },
      post: {
        summary: "Tambahkan member baru",
        parameters: [
          {
            in: "body",
            name: "body",
            required: true,
            schema: {
              $ref: "#/definitions/Member"
            }
          }
        ],
        responses: {
          201: {
            description: "Member berhasil ditambahkan"
          }
        }
      }
    },
    "/members/{id}": {
      put: {
        summary: "Perbarui member berdasarkan ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer"
          },
          {
            in: "body",
            name: "body",
            required: true,
            schema: {
              $ref: "#/definitions/Member"
            }
          }
        ],
        responses: {
          200: {
            description: "Member berhasil diperbarui"
          }
        }
      },
      delete: {
        summary: "Hapus member berdasarkan ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer"
          }
        ],
        responses: {
          200: {
            description: "Member berhasil dihapus"
          }
        }
      }
    },
    "/books": {
      get: {
        summary: "Dapatkan semua books",
        responses: {
          200: {
            description: "Berhasil mendapatkan daftar buku",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/Book"
              }
            }
          }
        }
      },
      post: {
        summary: "Tambahkan buku baru",
        parameters: [
          {
            in: "body",
            name: "body",
            required: true,
            schema: {
              $ref: "#/definitions/Book"
            }
          }
        ],
        responses: {
          201: {
            description: "Buku berhasil ditambahkan"
          }
        }
      }
    },
    "/books/{id}": {
      put: {
        summary: "Perbarui buku berdasarkan ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer"
          },
          {
            in: "body",
            name: "body",
            required: true,
            schema: {
              $ref: "#/definitions/Book"
            }
          }
        ],
        responses: {
          200: {
            description: "Buku berhasil diperbarui"
          }
        }
      },
      delete: {
        summary: "Hapus buku berdasarkan ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer"
          }
        ],
        responses: {
          200: {
            description: "Buku berhasil dihapus"
          }
        }
      }
    },
    "/transactions": {
      get: {
        summary: "Dapatkan semua transaksi",
        responses: {
          200: {
            description: "Berhasil mendapatkan daftar transaksi",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/Transaction"
              }
            }
          }
        }
      },
      post: {
        summary: "Tambahkan transaksi baru",
        parameters: [
          {
            in: "body",
            name: "body",
            required: true,
            schema: {
              $ref: "#/definitions/Transaction"
            }
          }
        ],
        responses: {
          201: {
            description: "Transaksi berhasil ditambahkan"
          }
        }
      }
    },
    "/transactions/{id}": {
      put: {
        summary: "Perbarui transaksi berdasarkan ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer"
          },
          {
            in: "body",
            name: "body",
            required: true,
            schema: {
              $ref: "#/definitions/Transaction"
            }
          }
        ],
        responses: {
          200: {
            description: "Transaksi berhasil diperbarui"
          }
        }
      },
      delete: {
        summary: "Hapus transaksi berdasarkan ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer"
          }
        ],
        responses: {
          200: {
            description: "Transaksi berhasil dihapus"
          }
        }
      }
    }
  },
  definitions: {
    Member: {
      type: "object",
      properties: {
        name: { type: "string" },
        birthdate: { type: "string", format: "date" },
        address: { type: "string" },
        gender: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        validity: { type: "string", format: "date" }
      }
    },
    Book: {
      type: "object",
      properties: {
        title: { type: "string" },
        author: { type: "string" },
        genre: { type: "string" },
        published_date: { type: "string", format: "date" },
        stock: { type: "integer" }
      }
    },
    Transaction: {
      type: "object",
      properties: {
        member_id: { type: "integer" },
        book_id: { type: "integer" },
        borrow_date: { type: "string", format: "date" },
        return_date: { type: "string", format: "date" },
        status: { type: "string" }
      }
    }
  }
};

module.exports = swaggerJsDoc;
