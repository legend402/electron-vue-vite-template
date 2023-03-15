import path from 'path'
import Client from 'ssh2-sftp-client'
import config from './auth.json'

const localPath = path.resolve(__dirname, '../dist')
const remotePath = '/root/web/electron'

const main = async () => {
  const client = new Client()
  try {
    await client.connect(config)
    console.log('连接服务器成功')
    if (await client.exists(remotePath)) {
      await client.rmdir(remotePath, true)
      console.log('删除成功')
    }
    const result = await client.uploadDir(localPath, remotePath)
    console.log('上传成功');
    return result
  } catch (error) {
    console.log(error)
  } finally {
    client.end()
  }
}

main()