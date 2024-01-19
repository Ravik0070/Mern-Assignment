const rootUrl = process.env.NODE_ENV === 'production' ? 
'https://note-vault-api.vercel.app/api' : 'http://127.0.0.1:5000/api'

export default rootUrl;
