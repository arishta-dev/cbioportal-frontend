const csv = require('csvtojson');
const _ = require('lodash');

const suppressors = require('./suppressors');

// passing 11/11
//let csvFilePath = 'public/extract-2024-10-11T11_47_07.957Z.csv';

let hashes = '';

//csvFilePath = 'public/extract-2024-10-17T11_47_33.789Z.csv'; // 100k public

// this is from  a run 11/5 with some important failures to analyze
//hashes = `195248191,525365431,1791582317,1051626596,-489658843,352274093,-1357626028,776162948,1438895549,-1205163969,833980087,963616745,-1316865142,-1290515694,666661408,-60179780,588131830,1175958638`;

// // these are for public 100k
//hashes = `776162948,1791582317,1051626596,1090390722,1634096744,-1357626028,-517670758,-297044990,-723148861,-887269158,-157223238,-1609018360,688132288,-1012605014,663602026,1144436202,2080416722,2102636334,1616351403,116697458,-1145140218,440961037,1788201866,64435906,1526226372,954198833,-333224080,-77262384,-969783118,-2092699827,1122708088,705191799,-910997525,369597899,-589249907,-1733269776,532408117,793803824,2005451592,1946034863,1348899627,1736153850,2004861981,1069675380,-2104618878,-1375780045,-1436966818,-1498011539,-1840476236,1636322635,128823282,712950665,-1807144066,-760096379,1806024553,-1843047838,-1380244121,1908080601,2049138719,75325645,-1564433337,214093972,1584368526,739417518,788541298,-1388038023,-476428894,-1214473123,1798846884,-1336448229,-1479102524,1188628176,1211735112,267198007,-1042782005,1595526137,966120768,-1318775387,-770140034,458149073,-1320441691,1768280517,795362073,440551502,-1083874499,860411865,-1922049418,799514642,2103810746,344484572,-22512484,2075871805,1492814359,2086203791,1046746847,780773665,-1592145833,-1575752643,1528265113,-1374458187,-1474139020,582526768,-2074481817,-1628958227,-2005572217,701108624,-793717747,2078439121,903680661,604898834,1159409033,1376551148,-1025123895,406726936,-1451816705,844353247,-1086596952,-524277403,-1173492647,-263714217,-1961112625,173857178,810614460,776625487,-31077333,-407077673,1152625827,-1204029497,-89652514,950808923,1051361409,655075270,1268317673,-429080735,-180799065,-1918582159,1007754487,445434938,-925144313,-753993222,-828029157,80215185,422205512,-418276888,286347826,1427361749,1841103889,195201275,-278082425,808983848,-558350133,-1982884570,1793886130,104465905,2020005969,-707477776,-1978778776,-146997675,-1605436757,-1288011598,1892578715,-421733597,-2058737510,80797926,2011748125,643117475,656010203,-1838584313,-1379158149,751580838,-300376426,651701037,-284421827,1414588548,1578030439,-1507068659,-552803979,2003360028,1012087380,1119495128,-1018724775,721889439,-1386470488,264752805,-1135621441,53685031,1749320410,-936382059,-271726321,-162436654,-967499791,-924355432,-1967807980,790912582,104911974,105129966,-1015598432,-1547063844,766139610,186806395,1609106547,1137458771,-79793169,-366866963,403522477,1692625915,1918102498,1948188379,1638022655,-7628346,859917518,984138719,-1727165229,-909568546,-1384377258,-1102903634,651279273,-621859020,50108050,721556658,-971350762,55114441,710343427,-1000493817,2065459736,-2010309650,-642014706,1673252949,1288568484,-673406526,-2005371191,1763472544,-1839313216,584288761,899056493,1853556760,-1017785218,-375634338,-217771303,332837231,519954103,-1260921458,1770567231,-848340841,-1575059881,1702190015,1767257846,-90449809,617363688,2134508661,-1353337156,-553248058,1465520871,-2088091542,441238581,263322615,-1243420049,-90200341,533957831,1315006521,1178063322,166833031,-557402244,1128260157,-2090759291,1960991180,-2143298382,2061460930,540705850,-891152750,551129118,364406009,1221598853,788481188,305474268,1341878576,-1625668352,-778412359,-1155472560,463536766,1955600881,-1339515224,1010291232,-1923309873,1182161716,-1303867461,20329773,1116578757,1408885855,1550380971,-1325200994,-941248117,1182607929,-475796764,-1396246057,-93501061,317029493,-960086759,-614052829,-106281559,-1543588030,-490981905,-583187386,-1698981871,452337345,-1946046494,726060739,2076629381`;
//  the final 63
//hashes = '1144436202,2080416722,2102636334,116697458,1616351403,440961037,-1145140218,1788201866,-2092699827,705191799,-1843047838,1806024553,75325645,1908080601,2049138719,-1388038023,788541298,-1214473123,-1564433337,-476428894,1595526137,966120768,-1318775387,-1320441691,-1083874499,2075871805,1159409033,1376551148,-936382059,-271726321,-924355432,-967499791,1948188379,-7628346,1638022655,-621859020,-673406526,710343427,-1000493817,2065459736,-2005371191,617363688,-90449809,2134508661,-1353337156,551129118,2061460930,-2090759291,1960991180,-2143298382,540705850,-891152750,364406009,-1625668352,305474268,1955600881,-1923309873,-106281559,-614052829,-960086759,-1698981871,452337345,-583187386';
// 10 failures recent
//hashes = '-1934910867,1389452442,525365431,833980087,-1879923626,963616745,2000016239,1386926521,1695497181,-1316865142,799650787,-60179780,666661408,978744191,1175958638,-1840392882';
//63 that i think have to do with legacy issue of one study not being profiled if it doesn't have any mutations
//hashes = `963616745,525365431,195248191,-1205163969,-489658843,352274093,833980087,588131830,666661408,-60179780,1175958638,-1290515694,-1316865142,1946317495,-459512179,209538309,-1702588459,-375315257,-1096903105,1550369929,-222092833,-1155320233,-1918427737,-1386500079,2016456345,1768219760,1290520296,-933755525,721663558,-349944428,-284954334,-255238155,198928237,-381698904,-2068343766,-593828993,2026738066,303583770,407843497,-639848193,-1435761929,-73533065,-1108056071,-2146896587,1195659709,-2140059509,830374389,-1087705987,-1918570841,-925412627,1032724409,-1364349579,1689544399,-716285275,-47234787,1333012639,-1515321993,418921433,-437389743,1585389039,-283518115,1070204552,-206015797,800445779`
/// failures from 60,000 range
//hashes = '525365431,195248191,-489658843,352274093,-1205163969,833980087,963616745,-1290515694,-1316865142,666661408,-60179780,588131830,1175958638,-1702588459,-1096903105,-375315257,1946317495,-459512179,209538309,2016456345,1768219760,1290520296,-933755525,-349944428,721663558,-255238155,-284954334,-381698904,2026738066,303583770,-1435761929,-593828993,407843497,-639848193,-73533065,-1108056071,-2146896587,1195659709,-925412627,-1364349579,-1087705987,830374389,-2140059509,-716285275,418921433,1585389039,-437389743,-1515321993,1333012639,-206015797,800445779,1753790976,1070204552,1299134243,1426940153,-828883087,1129786076,-1796177052,-1233216071,2037112369,625124883,-1630698357,2106175226,-1346597328,1942465147,-582774632,650014218,-191918718,-391489277,701134203,1015101777,1962031419,276915836,-209644718,1286715598,-1813995434,376853481,1751516243,1955987519,580686336,1597658602,-1502925390,-1956400996,257231649,-909356149,-1369667810,-17479096,885286553,-1531987729,363500082,605285128,-1122921293,-1817676926,-109162004,-904387127,-1233539587,-691963395,-2008149145,1657404911,-1538075689,68897453,-1061532379,1977869468,-512418540,-229443002,-1033104882,-1519665436,1905310044,-1946461845,1909568499,-1549745691,1814467917,-1980131529,-1786905665,1898767734,-1802401273,1220300810,-1282253689,-1657476259,-612577835,-1601749797,-793284027,642059469,-250799439,1439107491,-1318235365,-1947513833,-1490792801,-1920666338,-115987050,-105295877,809969161,1507364211,-1001894295,-1488454849,1936520631,280728358,-786707568,1970635288,1457775849,1500347132,1013786578,-1210913317,-670883245,1315778516,1645895756,-693510682,528166254,316255512,2084147070,-1556616998,-714684062';

//genie 28k end ing 10/29
csvFilePath = 'genie/extract-2024-10-30T01_18_49.413Z.csv';
//hashes = '449223846,272110920,-1025259712,621573671,1580564797,1430699486,38956759,563047391,1557088045,-36163512,-679048346,-1680780076,69536088,1375412477,-2056887121,-745242224,-456848485,-856335056,1065125809,-1668076144,225366637,500987904,-767115642';

// these are genie
csvFilePath = 'genie/extract-2024-10-17T05_29_43.435Z.csv'; // passing as of 10/18

//csvFilePath = 'genie/extract-2024-10-14T16_35_15.134Z.csv'; //passing as of 10/18
//csvFilePath = `genie/extract-2024-10-14T20_29_07.301Z.csv`; //passing as of 10/18 (20 supressed)
//'genie/extract-2024-10-14T20_29_07.301Z.csv' passing as of 10/18 (20 supressed)
//csvFilePath = 'genie/extract-2024-10-17T18_26_53.439Z.csv'; //2 failures 10/18  -1413667366,767115642 (one is violin, other 1 missing mutation)

//pulic 50k from 10/24
//csvFilePath = 'public/extract-2024-10-25T00_15_06.092Z.csv';
// all of the failures in this list involve one single study prad_msk_mdanderson_2023
// hashes =
//     '-209504909,-531562904,-1368856638,1849796680,-177009809,-1929920957,-1122995550,508841848,-1156904464,2118457351,253120514,1968211789,609196251,25878611,1765601863,431381695,1299594822,-1261047362,-1453203342,-403755087,953159045,220425913,-394456947,1125924226,1038987770,-1861172660,-208108949,2130671075,-1281975003,360646137,645987230,-1024047954,-1732607194,-363417317,-1884406877,-402637663,1979786357,1367728874,164801087,-1800445908,-249776498,-1184006841,-1882674601,-1192795682,-1250501534,987805391';

// recent genie
//csvFilePath = 'genie/extract-2024-11-18T01_20_46.023Z.csv';
//hashes='500987904,1296737223,1974157372,1949632925,1135892867';

var axios = require('axios');
var { runSpecs } = require('./validation');

var exclusions = [];

const cliArgs = parseArgs();

const filters = [];

// these are for genie
//hashes = '1359960927,1531749719,-430446928,-1530985417,-767115642';

// convert hashes to RegExps
hashes = hashes.length ? hashes.split(',').map(s => new RegExp(s)) : [];

if (cliArgs.h) {
    hashes = cliArgs.h.split(',').map(h => new RegExp(h));
}

const START = cliArgs.s || 0;
const LIMIT = cliArgs.l || 10000000;

async function main() {
    const files = await csv()
        .fromFile(csvFilePath)
        .then(async jsonObj => {
            // clean out errant leading single quote
            jsonObj.forEach(d => (d['@hash'] = d['@hash'].replace(/^'/, '')));

            let uniq = _.uniqBy(jsonObj, '@hash')
                .filter(d => {
                    return _.every(
                        exclusions.map(re => re.test(d['@url']) === false)
                    );
                })
                .filter(d => {
                    return (
                        filters.length === 0 ||
                        _.every(filters.map(re => re.test(d['@url']) === true))
                    );
                })
                .filter(d => {
                    return (
                        hashes.length === 0 ||
                        _.some(hashes.map(re => re.test(d['@hash']) === true))
                    );
                });
            // .filter(d => {
            //     const data = JSON.parse(d['@data']);
            //
            //     console.log(int);
            //     return int.length === 0;
            // });

            const tests = uniq.slice(START, START + LIMIT).reduce((aggr, d) => {
                //delete data.genomicProfiles;
                //delete data.genomicDataFilters;

                try {
                    let data = JSON.parse(d['@data']);

                    const url = d['@url']
                        .replace(/^"|"$/g, '')
                        .replace(/^\/\/[^\/]*/, '')
                        .replace(/\/api\//, '/api/column-store/');

                    const label = d['@url']
                        .match(/\/api\/[^\/]*/i)[0]
                        .replace(/\/api\//, '')
                        .split('-')
                        .map(s => s.replace(/^./, ss => ss.toUpperCase()))
                        .join('');

                    aggr.push({
                        hash: d['@hash'],
                        label,
                        data,
                        url,
                    });
                } catch (err) {
                    console.log(err);
                }
                return aggr;
            }, []);

            // tests.forEach((t)=>{
            //     console.log(t.data.studyIds || t.data.studyViewFilter.studyIds);
            // })

            const fakeFiles = [
                {
                    file: 'fake',
                    suites: [
                        {
                            tests,
                        },
                    ],
                },
            ];

            return fakeFiles;
        });

    runSpecs(
        files,
        axios,
        'http://localhost:8082',
        cliArgs.v || '',
        onFail,
        suppressors
    );
}

main();

const onFail = (args, report) => {
    //console.log(JSON.stringify(args.data, null, 5));
    try {
        //console.log(report.clDataSorted[0]);
        //console.log(report.legacyDataSorted[0]);
    } catch (ex) {}

    // console.log(
    //     _.sum(
    //         JSON.stringify(report.clDataSorted)
    //             .split('')
    //             .map(c => c.charCodeAt(0))
    //     ),
    //     _.sum(
    //         JSON.stringify(report.legacyDataSorted)
    //             .split('')
    //             .map(c => c.charCodeAt(0))
    //     )
    // );

    const url = 'http://localhost:8082' + args.url;

    const curl = `
        curl '${url}' 
          -H 'accept: application/json, text/plain, */*' 
          -H 'accept-language: en-US,en;q=0.9' 
          -H 'cache-control: no-cache' 
          -H 'content-type: application/json' 
          -H 'cookie: _ga_ET18FDC3P1=GS1.1.1727902893.87.0.1727902893.0.0.0; _gid=GA1.2.1570078648.1728481898; _ga_CKJ2CEEFD8=GS1.1.1728589307.172.1.1728589613.0.0.0; _ga_5260NDGD6Z=GS1.1.1728612388.318.1.1728612389.0.0.0; _gat_gtag_UA_17134933_2=1; _ga=GA1.1.1260093286.1710808634; _ga_334HHWHCPJ=GS1.1.1728647421.32.1.1728647514.0.0.0' 
          -H 'pragma: no-cache' 
          -H 'priority: u=1, i'  
          -H 'sec-ch-ua: "Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"' 
          -H 'sec-ch-ua-mobile: ?0' 
          -H 'sec-ch-ua-platform: "macOS"' 
          -H 'sec-fetch-dest: empty' 
          -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36' 
          --data-raw '${JSON.stringify(args.data)}';
    `;

    cliArgs.c &&
        console.log(
            curl
                .trim()
                .split('\n')
                .join('')
        );
    //
    const studyIds = args.data.studyIds || args.data.studyViewFilter.studyIds;
    cliArgs.u &&
        console.log(
            `http://localhost:8082/study/summary?id=${studyIds.join(
                ','
            )}#filterJson=${JSON.stringify(args.data)}`
        );
};

function parseArgs() {
    const args = process.argv.slice(2);

    const pairs = args.filter(s => /=/.test(s));

    const single = args.filter(s => !/=/.test(s));

    const obj = {};

    single.forEach(a => {
        obj[a.replace(/^-/, '')] = true;
    });

    pairs.forEach(p => {
        const tuple = p.split('=');
        obj[tuple[0].replace(/^-/, '')] = tuple[1];
    });

    return obj;
}