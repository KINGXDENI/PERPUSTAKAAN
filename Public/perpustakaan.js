const apiUrl = "https://perpustakaan.dibo.biz.id/api/members"; // Sesuaikan URL API Anda.

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("member-form");
  const memberTableBody = document.querySelector("#member-table tbody");

  // Fetch data member saat halaman dimuat
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((member) => {
        addMemberToTable(member);
      });
    })
    .catch((error) => console.error("Gagal memuat data member:", error));

  // Tambahkan member baru
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const memberData = {
      id: document.getElementById("id").value,
      name: document.getElementById("name").value,
      birthdate: document.getElementById("birthdate").value,
      address: document.getElementById("address").value,
      gender: document.getElementById("gender").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      validity: document.getElementById("validity").value,
    };

    // Kirim data ke server
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(memberData),
    })
      .then((response) => response.json())
      .then(() => {
        addMemberToTable(memberData);
        form.reset();
      })
      .catch((error) => console.error("Gagal menambahkan member:", error));
  });

  // Tambahkan baris data ke tabel
  function addMemberToTable(member) {
    const row = document.createElement("tr");
    row.dataset.id = member.id;

    row.innerHTML = `
      <td>${member.id}</td>
      <td>${member.name}</td>
      <td>${member.birthdate}</td>
      <td>${member.address}</td>
      <td>${member.gender}</td>
      <td>${member.email}</td>
      <td>${member.phone}</td>
      <td>${member.validity}</td>
      <td>
        <button class="edit-btn text-blue-600 hover:text-blue-800">
          <i class="fas fa-edit"></i>
        </button>
        <button class="delete-btn text-red-600 hover:text-red-800">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;

    // Tombol edit
    const editButton = row.querySelector(".edit-btn");
    editButton.addEventListener("click", () => {
      editMember(member);
    });

    // Tombol hapus
    const deleteButton = row.querySelector(".delete-btn");
    deleteButton.addEventListener("click", () => {
      deleteMember(member.id, row);
    });

    memberTableBody.appendChild(row);
  }

  // Fungsi Edit
  function editMember(member) {
    const formEdit = document.createElement("div");
    formEdit.classList.add("edit-form");

    formEdit.innerHTML = `
      <div>
        <h3>Edit Member</h3>
        <label>No. Anggota:</label>
        <input type="text" id="edit-id" value="${member.id}" readonly>

        <label>Nama:</label>
        <input type="text" id="edit-name" value="${member.name}">

        <label>TTL:</label>
        <input type="date" id="edit-birthdate" value="${member.birthdate}">

        <label>Alamat:</label>
        <textarea id="edit-address">${member.address}</textarea>

        <label>Jenis Kelamin:</label>
        <select id="edit-gender">
          <option value="Laki-Laki" ${member.gender === "Laki-Laki" ? "selected" : ""}>Laki-Laki</option>
          <option value="Perempuan" ${member.gender === "Perempuan" ? "selected" : ""}>Perempuan</option>
        </select>

        <label>Email:</label>
        <input type="email" id="edit-email" value="${member.email}">

        <label>Nomor Telepon:</label>
        <input type="tel" id="edit-phone" value="${member.phone}">

        <label>Masa Berlaku:</label>
        <input type="date" id="edit-validity" value="${member.validity}">

        <button id="save-edit" class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Simpan
        </button>
        <button id="cancel-edit" class="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500">
          Batal
        </button>
      </div>
    `;

    document.body.appendChild(formEdit);

    // Simpan perubahan
    document.getElementById("save-edit").addEventListener("click", () => {
      const updatedMember = {
        id: member.id,
        name: document.getElementById("edit-name").value,
        birthdate: document.getElementById("edit-birthdate").value,
        address: document.getElementById("edit-address").value,
        gender: document.getElementById("edit-gender").value,
        email: document.getElementById("edit-email").value,
        phone: document.getElementById("edit-phone").value,
        validity: document.getElementById("edit-validity").value,
      };

      fetch(`${apiUrl}/${member.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMember),
      })
        .then((response) => response.json())
        .then(() => {
          // Perbarui tampilan tabel
          const row = document.querySelector(`tr[data-id="${member.id}"]`);
          row.innerHTML = `
            <td>${updatedMember.id}</td>
            <td>${updatedMember.name}</td>
            <td>${updatedMember.birthdate}</td>
            <td>${updatedMember.address}</td>
            <td>${updatedMember.gender}</td>
            <td>${updatedMember.email}</td>
            <td>${updatedMember.phone}</td>
            <td>${updatedMember.validity}</td>
            <td>
              <button class="edit-btn text-blue-600 hover:text-blue-800">
                <i class="fas fa-edit"></i>
              </button>
              <button class="delete-btn text-red-600 hover:text-red-800">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          `;
          document.body.removeChild(formEdit);
        })
        .catch((error) => console.error("Gagal menyimpan perubahan:", error));
    });

    // Batal
    document.getElementById("cancel-edit").addEventListener("click", () => {
      document.body.removeChild(formEdit);
    });
  }

  // Fungsi Hapus
  function deleteMember(id, row) {
    if (confirm("Anda yakin ingin menghapus member ini?")) {
      fetch(`${apiUrl}/${id}`, { method: "DELETE" })
        .then(() => {
          row.remove();
        })
        .catch((error) => console.error("Gagal menghapus member:", error));
    }
  }
});
