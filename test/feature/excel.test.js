import supertest from 'supertest'
import web from '../../src/applications/web.js'
import mongoose from '../../src/applications/database.js'
import { createTestUsers, removeAllTestUsers } from '../utils.js'

afterAll(async () => {
  mongoose.connection.close()
})

describe('POST /api/excel/upload', () => {
  afterEach(async () => {
    await removeAllTestUsers()
  })

  it('should can upload and insert to database', async () => {
    const result = await supertest(web)
      .post('/api/excel/upload')
      .attach('file', process.cwd() + '/test/sample.xlsx')

    expect(result.status).toBe(200)
  })

  it('reject upload if file is empty', async () => {
    const result = await supertest(web).post('/api/excel/upload')

    expect(result.status).toBe(422)
  })
})

describe('GET /api/excel/users', () => {
  beforeEach(async () => {
    await removeAllTestUsers()
    await createTestUsers()
  })

  afterEach(async () => {
    await removeAllTestUsers()
  })

  it('should can get all users has uploaded', async () => {
    const result = await supertest(web).get('/api/excel/users')

    expect(result.status).toBe(200)
    expect(result.body.data.length).toBe(10)
  })
})

describe('GET /api/excel/download', () => {
  it('should can download data from database to be excel file', async () => {
    const result = await supertest(web).get('/api/excel/download')

    expect(result.status).toBe(200)
    expect(result.headers['content-disposition']).toContain('attachment')
    expect(result.headers['content-disposition']).toContain('.xlsx')
  })
})
