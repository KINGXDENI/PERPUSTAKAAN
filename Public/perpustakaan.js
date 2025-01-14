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
      <td class="border border-gray-300 px-4 py-2">${member.id}</td>
      <td class="border border-gray-300 px-4 py-2">${member.name}</td>
      <td class="border border-gray-300 px-4 py-2">${new Date(member.birthdate).toLocaleDateString('id-ID')}</td>
      <td class="border border-gray-300 px-4 py-2">${member.address}</td>
      <td class="border border-gray-300 px-4 py-2">${member.gender}</td>
      <td class="border border-gray-300 px-4 py-2">${member.email}</td>
      <td class="border border-gray-300 px-4 py-2">${member.phone}</td>
      <td class="border border-gray-300 px-4 py-2">${new Date(member.validity).toLocaleDateString('id-ID')}</td>
      <td class="border border-gray-300 px-4 py-2">
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
        <input type="text" id="edit-id" value="${member.id}" readonly class="input mb-2">

        <label>Nama:</label>
        <input type="text" id="edit-name" value="${member.name}" class="input mb-2">

        <label>TTL:</label>
        <input type="date" id="edit-birthdate" value="${member.birthdate}" class="input mb-2">

        <label>Alamat:</label>
        <textarea id="edit-address" class="textarea mb-2">${member.address}</textarea>

        <label>Jenis Kelamin:</label>
        <select id="edit-gender" class="select mb-2">
          <option value="Laki-Laki" ${member.gender === "Laki-Laki" ? "selected" : ""}>Laki-Laki</option>
          <option value="Perempuan" ${member.gender === "Perempuan" ? "selected" : ""}>Perempuan</option>
        </select>

        <label>Email:</label>
        <input type="email" id="edit-email" value="${member.email}" class="input mb-2">

        <label>Nomor Telepon:</label>
        <input type="tel" id="edit-phone" value="${member.phone}" class="input mb-2">

        <label>Masa Berlaku:</label>
        <input type="date" id="edit-validity" value="${member.validity}" class="input mb-2">

        <button id="save-edit" class="btn btn-primary mr-2">
          Simpan
        </button>
        <button id="cancel-edit" class="btn btn-secondary">
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
            <td class="border border-gray-300 px-4 py-2">${updatedMember.id}</td>
            <td class="border border-gray-300 px-4 py-2">${updatedMember.name}</td>
            <td class="border border-gray-300 px-4 py-2">${new Date(updatedMember.birthdate).toLocaleDateString('id-ID')}</td>
            <td class="border border-gray-300 px-4 py-2">${updatedMember.address}</td>
            <td class="border border-gray-300 px-4 py-2">${updatedMember.gender}</td>
            <td class="border border-gray-300 px-4 py-2">${updatedMember.email}</td>
            <td class="border border-gray-300 px-4 py-2">${updatedMember.phone}</td>
            <td class="border border-gray-300 px-4 py-2">${new Date(updatedMember.validity).toLocaleDateString('id-ID')}</td>
            <td class="border border-gray-300 px-4 py-2">
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
