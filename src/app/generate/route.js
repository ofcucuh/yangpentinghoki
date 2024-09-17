import {get} from '@vercel/edge-config'
import {has} from '@vercel/edge-config'
import {NextResponse} from 'next/server'

export async function GET(request) {
    const {searchParams} = new URL(request.url)
    const type = searchParams.get('type')
    const id = searchParams.get('id')
    let singleData = null
    let allData = null
    if(type || id) singleData = await has(type)
    if (singleData) {
        if (type == 'opsi'){
            // console.log(opsi()[id])
            return NextResponse.json(opsi(id))
        }

        if (type == 'pertanyaan'){
            return NextResponse.json(pertanyaan(id))
        }

        if (type == 'jawaban'){
            return NextResponse.json(jawaban(id))
        }
        const returnValue = await get(type)
        return NextResponse.json(returnValue[id])
    }
    const all = searchParams.get('all')
    if(all) allData = await fetchAllData()
    if(allData){
        const hasilValues = allData.filter((item) => item.key.startsWith("hasil-"));
        return NextResponse.json(hasilValues)
    }
    return NextResponse.json('Method not allowed', {'status': 500})
}

const fetchAllData = async () => {
    try {
        const listItems = await fetch(
          'https://api.vercel.com/v1/edge-config/ecfg_jamaopkprhnusnr1nvsvgmta3hkf/items',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${process.env.token}`,
              'Content-Type': 'application/json'
            },
          },
        );
        const result = await listItems.json();
        return result
      } catch (error) {
        console.log(error);
      }
}
const fecthData = async (key, value) => {
    try {
        const updateEdgeConfig = await fetch(
            'https://api.vercel.com/v1/edge-config/ecfg_jamaopkprhnusnr1nvsvgmta3hkf/items',
            {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${process.env.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    items: [
                        {
                            "operation": "create",
                            "key": key,
                            "value": value,
                        }
                    ]
                })
            },
        );
        const result = await updateEdgeConfig.json();
        console.log(result);
        return result
    } catch (error) {
        console.log(error);
        return null
    }
}

const pertanyaan = (id) => {
    const valPertanyaan = {
    "1": "Siapa Presiden pertama di Indonesia?",
    "2": "Pilih yang bukan bahasa pemrograman",
    "3": "Komputer terdiri dari?",
    "4": "Tahun berapa perang Dunia Ke-2 berakhir?",
    "5": "Material paling keras adalah?",
    "6": "Unsur kimia cuka?",
    "7": "PLTA singkatan dari?",
    "8": "Pilih jawaban A, BUKAN opsi A",
    "9": "Ideologi Korea Utara adalah?",
    "10": "Pemilik Twitter saat ini?",
    "11": "Termasuk negara pecahan Uni Soviet",
    "12": "Plat nomor kendaraan \"A\" adalah kendaraan asal daerah apa?",
    "13": "Yoghurt merupakan hasil fermentasi dari apa?",
    "14": "Siapa presiden RI keempat?",
    "15": "Warna ungu merupakan pencampuran dari warna?",
    "16": "Angkor wat terletak dimana?",
    "17": "Barbie / Openheimer?",
    "18": "WHO merupakan singkatan dari?",
    "19": "Siapa penulis novel Laskar Pelangi?",
    "20": "Siapa penemu lampu?",
    "21": "Dimana virus corona muncul pertama kali?",
    "22": "Sinonim jahat?",
    "23": "Antonim baik?",
    "24": "Spesalis Garut kecuali?",
    "25": "Termasuk merk sepatu",
    "26": "Termasuk yang mudah hilang kecuali",
    "27": "S.Kom merupakan kependekan dari?",
    "28": "Kumaha barudak???",
    "29": "Sebab kau terlalu indah dari sekadar?",
    "30": "Apotek / Apotik?",
    "31": "Bahasa Inggris dari Gajah adalah?",
    "32": "Berapa sisi yang dimiliki oleh balok?",
    "33": "Sepeda motor, merupakan kendaraan ...",
    "34": "Pengguna kacamata minus, memiliki gangguan untuk ... ",
    "35": "Diabetes adalah penyakit yang diakibatkan oleh?",
    "36": "Dibawah ini yang termasuk browser adalah?",
    "37": "Ada berapa batang rokok didalam 1 bungkus Magnum?",
    "38": "Secara umum, warna apa yang tidak ada dalam rubik?",
    "39": "Pecahan paling kecil dalam rupiah saat ini adalah?",
    "40": "Bahasa Inggris dari Kemeja adalah?",
    "41": "Jangan biarkan ku pulang ke ... yang bukan engkau",
    "42": "Perang dingin saat ini terjadi di negara?",
    "43": "Media sosial yang digunakan untuk chatting adalah?",
    "44": "Earphone wireless artinya?",
    "45": "Komponen komputer yang digunakan untuk mengetik adalah?",
    "46": "Terdapat berapa bit dalam 1 byte?",
    "47": "Berapa total hari dalam tahun kabisat?",
    "48": "Berapa jam dalam satu hari?",
    "49": "Mengapa bunga melati lebih wangi ketika malam hari?",
    "50": "Dimana 0 Km Kota Bandung?"
  }
  return valPertanyaan[id]
}

const opsi = (id) => {
    const valOpsi = {
    "1": {
        "A": "Soekarno",
        "B": "Megawati",
        "C": "Bj. Habibie",
        "D": "Joko Widodo"
    },
    "2": {
        "A": "HTML",
        "B": "Java",
        "C": "Python",
        "D": "Ruby"
    },
    "3": {
        "A": "K O M P U T E R",
        "B": "Hardware, Software, Brainware",
        "C": "Duit",
        "D": "Semua Salah"
    },
    "4": {
        "A": "1945",
        "B": "1946",
        "C": "1921",
        "D": "1997"
    },
    "5": {
        "A": "Diamond",
        "B": "Emas",
        "C": "Kaca",
        "D": "Besi"
    },
    "6": {
        "A": "CH3COOH",
        "B": "H2O",
        "C": "O2",
        "D": "NaCl"
    },
    "7": {
        "A": "Pembangkit Listrik Tenaga Air",
        "B": "Pulang Langsung Tidur Aku",
        "C": "Pembangkit Listrik Tenaga Aku",
        "D": "Dahlah Cape Skornya 1"
    },
    "8": {
        "A": "A",
        "B": "B",
        "C": "C",
        "D": "D"
    },
    "9": {
        "A": "Komunis",
        "B": "Demokrasi",
        "C": "Kapitalisme",
        "D": "Liberalisme"
    },
    "10": {
        "A": "Elon Musk",
        "B": "Mark Zuckerberg",
        "C": "Larry Page",
        "D": "Kukuh Iman Damaryanto"
    },
    "11": {
        "A": "Azerbaijan",
        "B": "China",
        "C": "Uni",
        "D": "Soviet"
    },
    "12": {
        "A": "Banten",
        "B": "Bandung",
        "C": "Jogja",
        "D": "Garut"
    },
    "13": {
        "A": "Susu",
        "B": "Keju",
        "C": "Air",
        "D": "Cimory"
    },
    "14": {
        "A": "Gus Dur",
        "B": "Megawati",
        "C": "Joko Widodo",
        "D": "Soekarno"
    },
    "15": {
        "A": "Merah dan Biru",
        "B": "Merah dan Putih",
        "C": "Rasa Anggur",
        "D": "Merah, Hitam, Putih"
    },
    "16": {
        "A": "Kamboja",
        "B": "China",
        "C": "Rusia",
        "D": "Singapura"
    },
    "17": {
        "A": "Semua Benar",
        "B": "Barbie",
        "C": "Openheimer",
        "D": "Semua Salah"
    },
    "18": {
        "A": "World Health Organization",
        "B": "Siapa?",
        "C": "World Heart Operation",
        "D": "What How Optimization"
    },
    "19": {
        "A": "Andrea Hirata",
        "B": "Agatha Christie",
        "C": "Raditya Dika",
        "D": "J. K. Rowling"
    },
    "20": {
        "A": "Thomas Alpha Edison",
        "B": "Thomas Kereta",
        "C": "LISA Blackpink",
        "D": "Alexander Graham Bell"
    },
    "21": {
        "A": "Wuhan",
        "B": "Wahun",
        "C": "Hawun",
        "D": "Huhan"
    },
    "22": {
        "A": "Bengis",
        "B": "Fuckboy",
        "C": "Goodgirl",
        "D": "Baik"
    },
    "23": {
        "A": "Jahat",
        "B": "Sehat",
        "C": "Sedih",
        "D": "Gila"
    },
    "24": {
        "A": "Mixue",
        "B": "Dodol",
        "C": "Dorokdok",
        "D": "Tukang cukur"
    },
    "25": {
        "A": "Brodo",
        "B": "Asus",
        "C": "Tokopedia",
        "D": "Xiaomi"
    },
    "26": {
        "A": "Aku",
        "B": "Kunci motor",
        "C": "Gunting Kuku",
        "D": "Duit"
    },
    "27": {
        "A": "Sarjana Komputer",
        "B": "Sarjana Komedi",
        "C": "Sarana Komputer",
        "D": "Sesajen Komedi"
    },
    "28": {
        "A": "WELL",
        "B": "WELL",
        "C": "WELL",
        "D": "WELL"
    },
    "29": {
        "A": "Kata",
        "B": "Staycation",
        "C": "Teman",
        "D": "BOD"
    },
    "30": {
        "A": "Apotek",
        "B": "Apotik",
        "C": "Apotek",
        "D": "Apotik"
    },
    "31": {
        "A": "Elephant",
        "B": "Eleven",
        "C": "Elevator",
        "D": "El Burger"
    },
    "32": {
        "A": "6 Sisi",
        "B": "4 Sisi",
        "C": "8 Sisi",
        "D": "10 Sisi"
    },
    "33": {
        "A": "Roda dua",
        "B": "Roda empat",
        "C": "Tiga Roda",
        "D": "Garut"
    },
    "34": {
        "A": "Melihat jarak jauh",
        "B": "Melihat Jarak dekat",
        "C": "Melihat tanpa warna",
        "D": "Tidak bisa melihat"
    },
    "35": {
        "A": "Rusaknya Pankreas",
        "B": "Rusaknya Hati",
        "C": "Kurang Minum",
        "D": "Kebanyakan Tidur"
    },
    "36": {
        "A": "Mozila Firefox",
        "B": "Whatsapp",
        "C": "Facebook",
        "D": "Instagram"
    },
    "37": {
        "A": "12 Batang",
        "B": "16 Batang",
        "C": "20 Batang",
        "D": "1 Batang"
    },
    "38": {
        "A": "Ungu",
        "B": "Kuning",
        "C": "Merah",
        "D": "Semua Salah"
    },
    "39": {
        "A": "Rp. 100",
        "B": "Rp. 25",
        "C": "Rp. 10",
        "D": "Rp. 200"
    },
    "40": {
        "A": "Shirt",
        "B": "T-Shirt",
        "C": "To Desk",
        "D": "Pants"
    },
    "41": {
        "A": "Rumah",
        "B": "Kosan",
        "C": "Hati",
        "D": "Dekat"
    },
    "42": {
        "A": "Korea Utara dan Korea Selatan",
        "B": "Baleendah dan Bojongsoang",
        "C": "Bandung dan Cimahi",
        "D": "Amerika dan Indonesia"
    },
    "43": {
        "A": "Whatsapp",
        "B": "Tiktok",
        "C": "Facebook",
        "D": "Twitter"
    },
    "44": {
        "A": "Earphone nirkabel",
        "B": "Earphone dengan kabel",
        "C": "Earphone tapi Headset",
        "D": "Headset"
    },
    "45": {
        "A": "Keyboard",
        "B": "LCD",
        "C": "Harddisk",
        "D": "Laptop"
    },
    "46": {
        "A": "8 bit",
        "B": "16 bit",
        "C": "31 bit",
        "D": "1 bit"
    },
    "47": {
        "A": "366",
        "B": "365",
        "C": "356",
        "D": "355"
    },
    "48": {
        "A": "24",
        "B": "26",
        "C": "25",
        "D": "12"
    },
    "49": {
        "A": "Karena mekar di malam hari",
        "B": "Karena malam banyak hantu",
        "C": "Takut sama bunga mawar",
        "D": "Malu"
    },
    "50": {
        "A": "Jln. Asia Afrika",
        "B": "Jln. Buah Batu",
        "C": "Jln. Bojongsoang",
        "D": "Jln. Sukasenang"
    },
}
    return valOpsi[id]
}

const jawaban = (id) => {
    const valJawaban = {
        "1": "Soekarno",
        "2": "HTML",
        "3": "Hardware, Software, Brainware",
        "4": "1945",
        "5": "Diamond",
        "6": "CH3COOH",
        "7": "Pembangkit Listrik Tenaga Air",
        "8": "A",
        "9": "Komunis",
        "10": "Elon Musk",
        "11": "Azerbaijan",
        "12": "Banten",
        "13": "Susu",
        "14": "Gus Dur",
        "15": "Merah dan Biru",
        "16": "Kamboja",
        "17": "Semua Benar",
        "18": "World Health Organization",
        "19": "Andrea Hirata",
        "20": "Thomas Alpha Edison",
        "21": "Wuhan",
        "22": "Bengis",
        "23": "Jahat",
        "24": "Mixue",
        "25": "Brodo",
        "26": "Aku",
        "27": "Sarjana Komputer",
        "28": "WELL",
        "29": "Kata",
        "30": "Apotek",
        "31": "Elephant",
        "32": "6 Sisi",
        "33": "Roda dua",
        "34": "Melihat jarak jauh",
        "35": "Rusaknya Pankreas",
        "36": "Mozila Firefox",
        "37": "12 Batang",
        "38": "Ungu",
        "39": "Rp. 100",
        "40": "Shirt",
        "41": "Rumah",
        "42": "Korea Utara dan Korea Selatan",
        "43": "Whatsapp",
        "44": "Earphone nirkabel",
        "45": "Keyboard",
        "46": "8 bit",
        "47": "366",
        "48": "24",
        "49": "Karena mekar di malam hari",
        "50": "Jln. Asia Afrika"
    }
    return valJawaban[id]
}

export async function POST(request) {
    try {
        const body = await request.json();
        // console.log(body)
        // console.log("hasil-"+body.hasil.uid)
        if (body.hasil){
            const valueKirim = {"nama":body.hasil.nama,"score":body.hasil.score}
            await fecthData("hasil-"+body.hasil.uid,valueKirim)
            return NextResponse.json(true)
        }
        if (!body.jawaban || !body.id) {
            throw 'error missing properties';
        }

        
        // const returnValue = await get("jawaban")
        const dataJawaban =  jawaban([body.id])

        if (dataJawaban === body.jawaban) return NextResponse.json(true)
        
        return NextResponse.json(false)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            'msg': error
        }, {'status': 500})
    }
}