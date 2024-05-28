import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import Cdata from '../../assets/data/data.json'



const bundleImages = {
  usd: require("../../assets/flags/flag128/usd.png"),
  eur: require("../../assets/flags/flag128/eur.png"),
  gbp: require("../../assets/flags/flag128/gbp.png"),
  chf: require("../../assets/flags/flag128/chf.png"),
  cad: require("../../assets/flags/flag128/cad.png"),
  aud: require("../../assets/flags/flag128/aud.png"),
  sek: require("../../assets/flags/flag128/sek.png"),
  nok: require("../../assets/flags/flag128/nok.png"),
  rub: require("../../assets/flags/flag128/rub.png"),
  thb: require("../../assets/flags/flag128/thb.png"),
  sgd: require("../../assets/flags/flag128/sgd.png"),
  hkd: require("../../assets/flags/flag128/hkd.png"),
  azn: require("../../assets/flags/flag128/azn.png"),
  amd: require("../../assets/flags/flag128/amd.png"),
  dkk: require("../../assets/flags/flag128/dkk.png"),
  aed: require("../../assets/flags/flag128/aed.png"),
  jpy: require("../../assets/flags/flag128/jpy.png"),
  try: require("../../assets/flags/flag128/try.png"),
  cny: require("../../assets/flags/flag128/cny.png"),
  sar: require("../../assets/flags/flag128/sar.png"),
  inr: require("../../assets/flags/flag128/inr.png"),
  myr: require("../../assets/flags/flag128/myr.png"),
  afn: require("../../assets/flags/flag128/afn.png"),
  kwd: require("../../assets/flags/flag128/kwd.png"),
  iqd: require("../../assets/flags/flag128/iqd.png"),
  bhd: require("../../assets/flags/flag128/bhd.png"),
  omr: require("../../assets/flags/flag128/omr.png"),
  qar: require("../../assets/flags/flag128/qar.png"),
  gel: require("../../assets/flags/flag128/gel.png"),
  brl: require("../../assets/flags/flag128/brl.png"),
  nzd: require("../../assets/flags/flag128/nzd.png"),
  pkr: require("../../assets/flags/flag128/pkr.png"),
  ars: require("../../assets/flags/flag128/ars.png"),
  krw: require("../../assets/flags/flag128/krw.png"),
  syp: require("../../assets/flags/flag128/syp.png"),
  kgs: require("../../assets/flags/flag128/kgs.png"),
  tjs: require("../../assets/flags/flag128/tjs.png"),
  tmt: require("../../assets/flags/flag128/tmt.png"),
};

const getImageUrl = (code) => bundleImages[code];
function FlagColumn({ currencyCode }) {
  const flagPath = getImageUrl(currencyCode);

  return (
    <img style={{width:32,height:32}} src={flagPath} alt={`Flag of ${currencyCode}`} />
  );
}
const CurrencyData = (Cdata) => {
  let data = Cdata.arz;
  var res = []
  let counter = 0
  for (let item of data) {
    let flag = item.slug;
    
    if (item.slug === "usd-hav" || item.slug === "usd-ist" || item.slug === "usd-herat" || item.slug === "usd-sulaymaniyah")
      flag = "usd"
    if (item.slug === "eur-hav" || item.slug === "eur-ist" )
      flag = 'eur'

    res.push({id: counter,flag:flag, name: item.name, buy: item.price[0].hi, sell: item.price[0].low, updated_at: item.updated_at})
    counter++
  } 
  return res;
}

// }
const CurrencyTableCulomns = [
  { width:20,
    label:'flag',
    dataKey: 'flag'
  },
  {
    width: 100,
    label: 'Currency',
    dataKey: 'name'
  },
  {
    width:111,
    label:'Buy',
    dataKey: 'buy'
  },
  {
    width: 111,
    label:'Sell',
    dataKey:'sell'
  },
  {
    width:200,
    label:'Updated At',
    dataKey: 'updated_at'
  }
]


const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table     {...props} size='small' sx={{ borderCollapse: 'separate', tableLayout: 'fixed'}} />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {CurrencyTableCulomns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'gainsboro',
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
   
    <React.Fragment>
      {CurrencyTableCulomns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
          >
          {column.dataKey === 'flag' ? (
          <FlagColumn currencyCode={row[column.dataKey]} />
          ) : (
            row[column.dataKey]
          )}        
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function CurrencyTable() {

  return (
    <Paper style={{ height: 600, width: '100%' }}>
      <TableVirtuoso
        data={CurrencyData(Cdata)}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
