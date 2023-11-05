import express from 'express'
import User from '../models/User.js'
import ErrorMsg from '../errors/message.error.js'
import successResponse from '../responses/success.response.js'
import xlsx from 'node-xlsx'
import fs from 'fs'
import { v4 as uuid } from 'uuid'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const upload = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ErrorMsg(422, 'Please upload an excel file')
    }

    const path = `${req.file.path}`
    const rows = xlsx.parse(path)[0].data

    // skip header
    rows.shift()

    let users = []
    rows.forEach((row) => {
      users.push({
        nik: row[1],
        email: row[2],
        nama_lengkap: row[3],
        jabatan: row[4],
        status_pegawai: row[5],
        nip: row[6],
        nip_is_verified: row[7] == true,
      })
    })

    users = await User.insertMany(users)

    return successResponse(res, users, 'Uploaded the file successfully')
  } catch (error) {
    next(error)
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getAll = async (req, res, next) => {
  try {
    const users = await User.find()

    return successResponse(res, users)
  } catch (error) {
    next(error)
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const download = async (req, res, next) => {
  try {
    const users = await User.find()
    const data = [
      [
        'id',
        'nik',
        'email',
        'nama_lengkap',
        'jabatan',
        'status_pegawai',
        'nip',
        'nip_is_verified',
      ],
      ...users.map((item) => {
        return [
          item._id.toString(),
          item.nik,
          item.email,
          item.nama_lengkap,
          item.jabatan,
          item.status_pegawai,
          item.nip,
          item.nip_is_verified,
        ]
      }),
    ]
    const sheetOptions = {
      '!cols': [
        { wch: 30 },
        { wch: 25 },
        { wch: 25 },
        { wch: 30 },
        { wch: 15 },
        { wch: 15 },
        { wch: 25 },
        { wch: 15 },
      ],
    }

    const buffer = xlsx.build([{ name: 'Sheet0', data: data }], {
      sheetOptions,
    })
    const path = `storage/${uuid()}.xlsx`

    fs.writeFileSync(path, buffer)
    
    res.status(200).download(path, (err) => {
      if (!err) fs.unlinkSync(path)
    })
  } catch (error) {
    next(error)
  }
}

export default { upload, getAll, download }
