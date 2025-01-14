const apiUrl = "https://perpustakaan.dibo.biz.id/api/members"; // Sesuaikan URL API Anda.

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("member-form");
  const memberTableBody = document.querySelector("#member-table tbody");

  // Fetch data member saat halaman dimuat
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      data.forEach(member => addMemberToTable(member));
    });

  // Tambahkan member baru
  form.addEventListener("submit", e => {
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

    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(memberData),
    })
      .then(response => response.json())
      .then(() => {
        addMemberToTable(memberData);
        form.reset();
      });
  });

  function addMemberToTable(member) {
    const row = document.createElement("tr");
    row.dataset.id = member.id;

    row.innerHTML = `
      <td class="px-4 py-2">${member.id}</td>
      <td class="px-4 py-2">${member.name}</td>
      <td class="px-4 py-2">${member.birthdate}</td>
      <td class="px-4 py-2">${member.address}</td>
      <td class="px-4 py-2">${member.gender}</td>
      <td class="px-4 py-2">${member.email}</td>
      <td class="px-4 py-2">${member.phone}</td>
      <td class="px-4 py-2">${member.validity}</td>
      <td class="px-4 py-2 text-center">
        <button class="edit-btn text-blue-600 hover:text-blue-800">
          <i class="fas fa-edit"></i>
        </button>
        <button class="delete-btn text-red-600 hover:text-red-800">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;

    row.querySelector(".edit-btn").addEventListener("click", () => editMember(member));
    row.querySelector(".delete-btn").addEventListener("click", () => deleteMember(member.id, row));
    memberTableBody.appendChild(row);
  }

  function editMember(member) {
    const formEdit = document.createElement("div");
    formEdit.classList.add("fixed", "inset-0", "bg-gray-800", "bg-opacity-50", "flex", "items-center", "justify-center");

    formEdit.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h3 class="text-lg font-bold mb-4">Edit Member</h3>
        <label class="block mb-2">No. Anggota:</label>
        <input type="text" id="edit-id" value="${member.id}" class="block w-full mb-4" readonly>

        <label class="block mb-2">Nama:</label>
        <input type="text" id="edit-name" value="${member.name}" class="block w-full mb-4">

        <label class="block mb-2">TTL:</label>
        <input type="date" id="edit-birthdate" value="${member.birthdate}" class="block w-full mb-4">

        <label class="block mb-2">Alamat:</label>
        <textarea id="edit-address" class="block w-full mb-4">${member.address}</textarea>

        <label class="block mb-2">Jenis Kelamin:</label>
        <select id="edit-gender" class="block w-full mb-4">
          <option value="Laki-Laki" ${member.gender === "Laki-Laki" ? "selected" : ""}>Laki-Laki</option>
          <option value="Perempuan" ${member.gender === "Perempuan" ? "selected" : ""}>Perempuan</option>
        </select>

        <label class="block mb-2">Email:</label>
        <input type="email" id="edit-email" value="${member.email}" class="block w-full mb-4">

        <label class="block mb-2">Nomor Telepon:</label>
        <input type="tel" id="edit-phone" value="${member.phone}" class="block w-full mb-4">

        <label class="block mb-2">Masa Berlaku:</label>
        <input type="date" id="edit-validity" value="${member.validity}" class="block w-full mb-4">

        <div class="flex justify-end space-x-4">
          <button id="save-edit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Simpan</button>
          <button id="cancel-edit" class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Batal</button>
        </div>
      </div>
    `;

    document.body.appendChild(formEdit);

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
        .then(response => response.json())
        .then(() => {
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
          formEdit.remove();
        });
    });

    document.getElementById("cancel-edit").addEventListener("click", () => formEdit.remove());
  }

  function deleteMember(id, row) {
    if (confirm("Anda yakin ingin menghapus member ini?")) {
      fetch(`${apiUrl}/${id}`, { method: "DELETE" })
        .then(() => row.remove())
        .catch(err => console.error("Gagal menghapus member:", err));
    }
  }
});
