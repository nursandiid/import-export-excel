import User from '../src/models/User'

const createTestUsers = async () => {
  let users = []
  for (let i = 1; i <= 10; i++) {
    users.push({
      nik: `1122334455${i}`,
      email: `1122${i}@examle.com`,
      nama_lengkap: `Test ${i}`,
      jabatan: `ABC`,
      status_pegawai: `PNS`,
      nip: `1122334455${i}`,
      nip_is_verified: false,
    })
  }

  await User.insertMany(users)
}

const removeAllTestUsers = async () => {
  await User.deleteMany({})
}

export { createTestUsers, removeAllTestUsers }
