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

        
        const returnValue = await get("jawaban")
        const dataJawaban =  returnValue[body.id]

        if (dataJawaban === body.jawaban) return NextResponse.json(true)
        
        return NextResponse.json(false)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            'msg': error
        }, {'status': 500})
    }
}