import db from '../lib/database.js'
const cooldown = 120000
let handler = async(m, { conn, usedPrefix, text, participants }) => {
    let user = db.data.users[m.sender]
    let timers = (cooldown - (new Date - user.lasttag))
    const header = `*–––––『 COOLDOWN 』–––––*`
    const footer = `
*ᴛᴀɢ-ᴀʟʟ* ʀᴇᴄᴇɴᴛʟʏ ᴜsᴇᴅ, ᴩʟᴇᴀsᴇ ᴡᴀɪᴛ ᴛɪʟʟ ᴄᴏᴏʟᴅᴏᴡɴ ғɪɴɪsʜ.

⏱️ ${timers.toTimeString()}
`
    const buffer = './media/cooldown.jpg'
    const button = [
[`ᴏᴋ 👌`, `${usedPrefix}ok`]
]
    if (new Date - user.lasttag <= cooldown) return conn.sendButton(m.chat, header, footer.trim(), buffer, button, m, {asLocation: true})
  let teks = `${text ? text : '*––––––『 Tag All 』––––––*'}\n\n${readMore}`
		      	for (let mem of participants) {
		            teks += `\n@${mem.id.split('@')[0]}`
				}
            await conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, )
    user.lasttag = new Date * 1
}
handler.help = ['tagall <text>']
handler.tags = ['Group']
handler.command = /^(tagall|all)$/i

handler.group = true
handler.limit = false
handler.cooldown = cooldown

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)