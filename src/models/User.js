import mongoose from '../applications/database.js'

const userSchema = new mongoose.Schema({
  nik: {
    type: String,
    required: true,
    min: 16,
    max: 16,
  },
  email: {
    type: String,
    required: true,
  },
  nama_lengkap: {
    type: String,
    required: true,
  },
  jabatan: {
    type: String,
    required: false
  },
  status_pegawai: {
    type: String,
    required: false
  },
  nip: {
    type: String,
    required: false
  },
  nip_is_verified: {
    type: Boolean,
    required: false,
  },
})

export default mongoose.model('User', userSchema)
