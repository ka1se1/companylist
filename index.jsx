import React, { useState, useEffect, useMemo } from 'react';
import { Search, Heart, GitCompare, ExternalLink, X, Check, BookOpen, Star, Filter, Sparkles } from 'lucide-react';

// ============================================================
// 企業データ（参考値：有価証券報告書等の公開情報ベース）
// ============================================================
const COMPANIES = [
  // ========== SIer ==========
  { id: 'nttdata', name: 'NTTデータ', category: 'sier', salary: 900, description: '官公庁・金融システムに強い国内最大手SIer。海外事業も積極的に拡大中。', url: 'https://nttdata-recruit.com/' },
  { id: 'nri', name: '野村総合研究所', category: 'sier', salary: 1232, description: 'コンサルとITを両輪とする業界トップクラス。金融・流通システムに強み。', url: 'https://www.nri.com/jp/career/' },
  { id: 'fujitsu', name: '富士通', category: 'sier', salary: 900, description: 'ICTソリューションの国内最大手。DXとクラウド領域へ大きく舵を切る。', url: 'https://www.fujitsu.com/jp/about/careers/' },
  { id: 'nec', name: 'NEC', category: 'sier', salary: 831, description: '社会インフラ・通信・公共システムに強み。AI・生体認証領域も世界水準。', url: 'https://jpn.nec.com/recruit/' },
  { id: 'hitachi', name: '日立製作所', category: 'sier', salary: 916, description: 'Lumadaを核にIT×OTで社会イノベーションを推進する総合電機・SI。', url: 'https://www.hitachi.co.jp/recruit/' },
  { id: 'ctc', name: '伊藤忠テクノソリューションズ', category: 'sier', salary: 964, description: '伊藤忠グループの独立系SIer。マルチベンダー戦略で通信・金融に強い。', url: 'https://www.ctc-g.co.jp/recruit/' },
  { id: 'scsk', name: 'SCSK', category: 'sier', salary: 746, description: '住友商事グループ。働きやすさで有名。幅広い業界のITサービスを提供。', url: 'https://www.scsk.jp/recruit/' },
  { id: 'tis', name: 'TIS', category: 'sier', salary: 767, description: 'カード・決済系システムに強い独立系大手SIer。金融領域で高シェア。', url: 'https://www.tis.co.jp/recruit/' },
  { id: 'biprogy', name: 'BIPROGY', category: 'sier', salary: 815, description: '旧日本ユニシス。金融・公共・流通の基幹システムに強い老舗SIer。', url: 'https://www.biprogy.com/recruit/' },
  { id: 'jri', name: '日本総合研究所', category: 'sier', salary: 837, description: '三井住友フィナンシャルグループのシンクタンク兼SI。SMBCの基幹を担う。', url: 'https://www.jri.co.jp/recruit/' },
  { id: 'dir', name: '大和総研', category: 'sier', salary: 828, description: '大和証券グループのシンクタンク兼SI。証券・金融ITに強み。', url: 'https://www.dir.co.jp/recruit/' },
  { id: 'dentsusoken', name: '電通総研', category: 'sier', salary: 1176, description: '旧ISID。電通グループ。ERP・金融・製造分野で先進ITを提供。', url: 'https://www.dentsusoken.com/recruit/' },
  { id: 'nssol', name: '日鉄ソリューションズ', category: 'sier', salary: 824, description: '日本製鉄グループ。製造・金融・社会公共領域に強み。', url: 'https://www.nssol.nipponsteel.com/recruit/' },
  { id: 'obic', name: 'オービック', category: 'sier', salary: 1058, description: '独立系SIer。統合業務ソフト「OBIC7」で高収益。驚異の営業利益率。', url: 'https://www.obic.co.jp/recruit/' },
  { id: 'shift', name: 'SHIFT', category: 'sier', salary: 604, description: 'ソフトウェアの品質保証・テストで急成長。M&Aで領域を拡大中。', url: 'https://recruit.shiftinc.jp/' },
  { id: 'canonits', name: 'キヤノンITソリューションズ', category: 'sier', salary: 719, description: 'キヤノン系SIer。製造・流通・公共向けシステム開発が主力。', url: 'https://www.canon-its.co.jp/recruit/' },
  { id: 'accenture', name: 'アクセンチュア', category: 'sier', salary: 867, description: '世界最大の総合コンサル。戦略〜実装まで一気通貫で手掛ける。', url: 'https://www.accenture.com/jp-ja/careers' },
  { id: 'fsi', name: '富士ソフト', category: 'sier', salary: 638, description: '独立系大手SIer。組込・制御系から業務系まで幅広くカバー。', url: 'https://www.fsi.co.jp/recruit/' },

  // ========== ユーザー系子会社 ==========
  { id: 'nttcom', name: 'NTTコムウェア', category: 'user', salary: 836, description: 'NTTグループの通信インフラを支えるSI。ドコモの基幹システムも担当。', url: 'https://www.nttcom.co.jp/recruit/' },
  { id: 'jeis', name: 'JR東日本情報システム', category: 'user', salary: 753, description: 'JR東日本グループ。Suicaや運行管理など鉄道ITの中核を担う。', url: 'https://www.jeis.co.jp/recruit/' },
  { id: 'toyotasystems', name: 'トヨタシステムズ', category: 'user', salary: 800, description: 'トヨタグループのITを一手に担う。生産・販売・物流システムが主戦場。', url: 'https://www.toyotasystems.com/recruit/' },
  { id: 'dcs', name: '三菱総研DCS', category: 'user', salary: 706, description: '三菱総研グループ。金融・公共向けシステムとBPOサービスを提供。', url: 'https://www.dcs.co.jp/recruit/' },
  { id: 'mizuhort', name: 'みずほリサーチ&テクノロジーズ', category: 'user', salary: 907, description: 'みずほFGの情報系子会社。シンクタンクとITを融合した体制。', url: 'https://www.mizuho-rt.co.jp/recruit/' },
  { id: 'muit', name: '三菱UFJインフォメーションテクノロジー', category: 'user', salary: 800, description: 'MUFGの基幹システム開発を担う中核IT子会社。巨大金融システムを運用。', url: 'https://www.muit.mufg.jp/recruit/' },
  { id: 'mki', name: '三井情報', category: 'user', salary: 900, description: '三井物産グループ。AI・ライフサイエンス・ネットワーク領域で独自色。', url: 'https://www.mki.co.jp/recruit/' },
  { id: 'tmnsys', name: '東京海上日動システムズ', category: 'user', salary: 773, description: '東京海上グループ。保険基幹システムと海外展開で事業拡大中。', url: 'https://www.tmn-systems.co.jp/recruit/' },
  { id: 'jalit', name: 'JALインフォテック', category: 'user', salary: 681, description: 'JALグループ。航空予約・運航管理など航空業務ITの中核を担う。', url: 'https://www.jalinfotec.co.jp/recruit/' },
  { id: 'anasys', name: 'ANAシステムズ', category: 'user', salary: 711, description: 'ANAグループ。航空券・マイレージ・運航支援システムを開発・運用。', url: 'https://www.anasystems.co.jp/recruit/' },
  { id: 'sompo', name: 'SOMPOシステムズ', category: 'user', salary: 756, description: '損保ジャパン系。保険基幹システムと先進技術の活用に注力。', url: 'https://www.sompo-sys.com/recruit/' },
  { id: 'jfesys', name: 'JFEシステムズ', category: 'user', salary: 786, description: 'JFEグループ。鉄鋼業界のITに加え、流通・サービス業向けも展開。', url: 'https://www.jfe-systems.com/recruit/' },
  { id: 'diri', name: '第一生命情報システム', category: 'user', salary: 728, description: '第一生命グループ。生命保険業界を支える基幹システムを開発。', url: 'https://www.diri.co.jp/recruit/' },
  { id: 'necsol', name: 'NECソリューションイノベータ', category: 'user', salary: 780, description: 'NECグループの中核SI子会社。公共・文教・医療など幅広く展開。', url: 'https://www.nec-solutioninnovators.co.jp/recruit/' },
  { id: 'sonygs', name: 'ソニーグローバルソリューションズ', category: 'user', salary: 758, description: 'ソニーグループのIT基盤を統括。グローバルなシステム企画・運用。', url: 'https://www.sonygs.co.jp/recruit/' },
  { id: 'jsol', name: 'JSOL', category: 'user', salary: 841, description: '日本総研と日本電気がルーツの独立性の高いSI。SAP案件に強い。', url: 'https://www.jsol.co.jp/recruit/' },
  { id: 'msisys', name: '三井住友海上システムズ', category: 'user', salary: 780, description: 'MS&ADインシュアランスグループ。保険会社の基幹ITを担う。', url: 'https://www.ms-ins.com/' },
  { id: 'jrwest', name: 'JR西日本ITソリューションズ', category: 'user', salary: 720, description: 'JR西日本グループ。鉄道・流通・ホテル事業のITを担当。', url: 'https://www.jrwits.co.jp/' },

  // ========== Web系 ==========
  { id: 'google', name: 'Google Japan', category: 'web', salary: 1600, description: '世界最大の検索・広告プラットフォーム。AI・クラウドで圧倒的存在。', url: 'https://careers.google.com/locations/tokyo/' },
  { id: 'lineyahoo', name: 'LINEヤフー', category: 'web', salary: 872, description: 'LINEとヤフーが経営統合。国内最大級のコミュニケーション×検索企業。', url: 'https://www.lycorp.co.jp/ja/company/careers/' },
  { id: 'rakuten', name: '楽天グループ', category: 'web', salary: 773, description: 'EC・金融・モバイルを展開する日本発のインターネット企業。英語公用語。', url: 'https://corp.rakuten.co.jp/careers/' },
  { id: 'cyberagent', name: 'サイバーエージェント', category: 'web', salary: 818, description: 'インターネット広告・メディア・ゲーム。ABEMAや多数の子会社を運営。', url: 'https://www.cyberagent.co.jp/careers/' },
  { id: 'dena', name: 'DeNA', category: 'web', salary: 825, description: 'ゲーム・ヘルスケア・ライブコミュニティなど多角的な事業展開。', url: 'https://dena.com/jp/recruit/' },
  { id: 'gree', name: 'GREE', category: 'web', salary: 756, description: 'ソーシャルゲーム・メタバース・投資事業を展開。アバターライブ配信「REALITY」を運営。', url: 'https://corp.gree.net/jp/ja/recruit/', xr: true },
  { id: 'mercari', name: 'メルカリ', category: 'web', salary: 971, description: '日本最大級のフリマアプリ。メルペイ・US展開・AI活用に積極的。', url: 'https://careers.mercari.com/jp/' },
  { id: 'recruit', name: 'リクルート', category: 'web', salary: 1138, description: '人材・販促領域でグローバル展開。Indeedなどプロダクト多数。', url: 'https://recruit-holdings.com/ja/careers/' },
  { id: 'zozo', name: 'ZOZO', category: 'web', salary: 437, description: 'ZOZOTOWN運営。ファッションEC国内最大手でテック投資も旺盛。', url: 'https://corp.zozo.com/about/recruit/' },
  { id: 'pixiv', name: 'ピクシブ', category: 'web', salary: 600, description: 'イラスト・マンガ投稿プラットフォーム「pixiv」を運営。', url: 'https://recruit.pixiv.net/' },
  { id: 'note', name: 'note', category: 'web', salary: 640, description: 'クリエイター向けメディアプラットフォーム。法人向けnote proも展開。', url: 'https://note.jp/n/nc1c44a6a3332' },
  { id: 'smarthr', name: 'SmartHR', category: 'web', salary: 802, description: '労務管理クラウドのトップシェア。人事領域のDXを牽引する急成長SaaS。', url: 'https://hello-world.smarthr.co.jp/' },
  { id: 'freee', name: 'freee', category: 'web', salary: 773, description: 'クラウド会計・人事労務のSaaS。スモールビジネス向け統合プラットフォーム。', url: 'https://corp.freee.co.jp/recruit/' },
  { id: 'mf', name: 'マネーフォワード', category: 'web', salary: 736, description: 'PFMとクラウド会計で業界シェア上位。Fintech領域の中核プレイヤー。', url: 'https://recruit.moneyforward.com/' },
  { id: 'kakaku', name: 'カカクコム', category: 'web', salary: 807, description: '価格.com・食べログを運営。国内最大級の比較サービス企業。', url: 'https://corporate.kakaku.com/recruit' },
  { id: 'm3', name: 'エムスリー', category: 'web', salary: 875, description: '医療従事者向けプラットフォーム。医師会員数で世界最大級。', url: 'https://corporate.m3.com/recruit/' },
  { id: 'cybozu', name: 'サイボウズ', category: 'web', salary: 643, description: 'kintone等の業務改善クラウド。ティール組織的な働き方で有名。', url: 'https://cybozu.co.jp/recruit/' },
  { id: 'classmethod', name: 'クラスメソッド', category: 'web', salary: 687, description: 'AWSプレミアティアサービスパートナー。クラウド・データ分野で急成長。', url: 'https://classmethod.jp/recruit/' },

  // ========== メーカー系 ==========
  { id: 'sony', name: 'ソニーグループ', category: 'maker', salary: 1113, description: 'エンタメ・半導体・金融を統合したグローバル企業。PS VR2など空間体験事業も展開。', url: 'https://www.sony.com/ja/SonyInfo/Jobs/', xr: true },
  { id: 'panasonic', name: 'パナソニック ホールディングス', category: 'maker', salary: 931, description: '家電・車載・BtoBソリューション。VR機器メーカーShiftallを傘下に持つ。', url: 'https://recruit.jpn.panasonic.com/', xr: true },
  { id: 'canon', name: 'キヤノン', category: 'maker', salary: 843, description: 'カメラ・プリンタ世界最大手。MRシステム「MREAL」で産業用XR領域も展開。', url: 'https://global.canon/ja/careers/', xr: true },
  { id: 'fujifilm', name: '富士フイルム', category: 'maker', salary: 1028, description: '写真フィルムから医療・化粧品・高機能材料へ華麗に事業転換。', url: 'https://www.fujifilm.com/jp/ja/careers' },
  { id: 'nintendo', name: '任天堂', category: 'maker', salary: 989, description: 'ゲーム機・ソフト開発の世界的企業。Switch後継機にも注目が集まる。', url: 'https://www.nintendo.co.jp/jobs/' },
  { id: 'toyota', name: 'トヨタ自動車', category: 'maker', salary: 895, description: '世界販売台数1位の自動車メーカー。モビリティカンパニーへ変革中。', url: 'https://toyota-career.snar.jp/' },
  { id: 'honda', name: '本田技研工業', category: 'maker', salary: 822, description: '自動車・二輪・航空機まで手掛ける独立系メーカー。電動化・知能化に注力。', url: 'https://www.honda-recruit.jp/' },
  { id: 'nissan', name: '日産自動車', category: 'maker', salary: 847, description: 'ルノー・三菱との3社アライアンス。EV「リーフ」や自動運転で先行。', url: 'https://www.nissan.co.jp/CAREER/' },
  { id: 'denso', name: 'デンソー', category: 'maker', salary: 812, description: 'トヨタグループの巨大自動車部品メーカー。世界シェア上位の製品多数。', url: 'https://www.denso.com/jp/ja/careers/' },
  { id: 'mitsubishielec', name: '三菱電機', category: 'maker', salary: 832, description: 'FA機器・エレベータ・宇宙機器など幅広い領域で世界シェア上位。', url: 'https://www.mitsubishielectric.co.jp/recruit/' },
  { id: 'shimadzu', name: '島津製作所', category: 'maker', salary: 841, description: '分析・計測・医療機器の老舗。ノーベル賞受賞者輩出でも有名。', url: 'https://www.shimadzu.co.jp/recruit/' },
  { id: 'omron', name: 'オムロン', category: 'maker', salary: 872, description: '制御機器・ヘルスケア・社会システムを展開。センシング技術に強み。', url: 'https://www.omron.com/jp/ja/careers/' },
  { id: 'murata', name: '村田製作所', category: 'maker', salary: 773, description: 'セラミックコンデンサ世界トップシェア。スマホ1台に数百個搭載。', url: 'https://career.murata.com/ja-jp/' },
  { id: 'kyocera', name: '京セラ', category: 'maker', salary: 771, description: 'ファインセラミックスを核に電子部品・通信・太陽電池まで多角化。', url: 'https://www.kyocera.co.jp/company/recruit/' },
  { id: 'tel', name: '東京エレクトロン', category: 'maker', salary: 1399, description: '半導体製造装置で世界トップクラス。業界の圧倒的高給企業。', url: 'https://www.tel.co.jp/career/' },
  { id: 'fanuc', name: 'ファナック', category: 'maker', salary: 1318, description: 'NC装置・産業ロボットで世界トップシェア。利益率の高さでも有名。', url: 'https://www.fanuc.co.jp/ja/recruit/' },
  { id: 'keyence', name: 'キーエンス', category: 'maker', salary: 2279, description: 'FAセンサ世界トップ。給与水準が日本トップクラスで就活生の憧れ。', url: 'https://www.keyence.co.jp/recruit/' },
  { id: 'ricoh', name: 'リコー', category: 'maker', salary: 848, description: '複合機で世界大手。オフィスのDX・スマートワーク領域へ拡大中。', url: 'https://jp.ricoh.com/recruit/' },

  // ========== AR/XR・メタバース ==========
  { id: 'cluster', name: 'クラスター', category: 'web', salary: 620, description: '国内最大級のメタバースプラットフォーム「cluster」を運営。大規模バーチャルイベントに強み。', url: 'https://corp.cluster.mu/recruit', xr: true },
  { id: 'hikky', name: 'HIKKY', category: 'web', salary: 600, description: '世界最大のVRイベント「バーチャルマーケット」を主催。VRエコノミーの創出を目指す。', url: 'https://www.hikky.life/recruit/', xr: true },
  { id: 'psychicvr', name: 'Psychic VR Lab', category: 'web', salary: 620, description: 'XRクリエイティブプラットフォーム「STYLY」を提供。ファッション・アート領域にも展開。', url: 'https://styly.inc/ja/careers/', xr: true },
  { id: 'hololab', name: 'ホロラボ', category: 'sier', salary: 680, description: 'HoloLensを活用した産業用MRソリューションに強み。建設・製造DXを推進。', url: 'https://hololab.co.jp/recruit/', xr: true },
  { id: 'shiftall', name: 'Shiftall', category: 'maker', salary: 720, description: 'パナソニック傘下のVRハードウェアベンチャー。MeganeXなど先進的VR機器を開発。', url: 'https://ja.shiftall.net/', xr: true },
  { id: 'synamon', name: 'Synamon', category: 'web', salary: 600, description: '法人向けXRソリューションを提供。バーチャル会議・研修・イベント分野に注力。', url: 'https://synamon.jp/recruit/', xr: true },
  { id: 'meson', name: 'MESON', category: 'web', salary: 650, description: 'AR/XRの体験設計に特化した少数精鋭スタジオ。Apple Vision Pro等の先進領域に強い。', url: 'https://meson.inc/careers', xr: true },
  { id: 'bandainamco', name: 'バンダイナムコエンターテインメント', category: 'maker', salary: 1130, description: 'ゲーム・IP事業の大手。VR ZONEなどリアル×XRエンタメも展開。', url: 'https://recruit.bandainamcoent.co.jp/', xr: true },
];

// ============================================================
// カテゴリ定義
// ============================================================
const CATEGORIES = {
  sier: { label: 'SIer', color: '#1E3A5F', bg: '#E8EDF3', description: 'システムインテグレータ。顧客企業のシステム開発を請け負う。' },
  user: { label: 'ユーザー系', color: '#8B2635', bg: '#F5E8E9', description: '事業会社の情報システム子会社。親会社の基幹ITを担う。' },
  web: { label: 'Web系', color: '#2D5F3E', bg: '#E8F0EA', description: '自社サービスを軸にインターネット事業を展開。' },
  maker: { label: 'メーカー系', color: '#8B6914', bg: '#F3EDDA', description: '製造業。自社製品の企画・開発・製造・販売を行う。' },
};

// ============================================================
// ストレージヘルパー
// ============================================================
const loadFromStorage = async (key, defaultVal) => {
  try {
    const result = await window.storage.get(key);
    return result ? JSON.parse(result.value) : defaultVal;
  } catch (e) {
    return defaultVal;
  }
};

const saveToStorage = async (key, value) => {
  try {
    await window.storage.set(key, JSON.stringify(value));
  } catch (e) {
    console.error('Save failed:', e);
  }
};

// ============================================================
// メインコンポーネント
// ============================================================
export default function App() {
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState(new Set(['sier', 'user', 'web', 'maker']));
  const [xrOnly, setXrOnly] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [compareList, setCompareList] = useState([]);
  const [view, setView] = useState('all');
  const [showCompare, setShowCompare] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // 初期ロード
  useEffect(() => {
    (async () => {
      const favs = await loadFromStorage('favorites', []);
      setFavorites(new Set(favs));
      setLoaded(true);
    })();
  }, []);

  // お気に入り保存
  useEffect(() => {
    if (loaded) {
      saveToStorage('favorites', Array.from(favorites));
    }
  }, [favorites, loaded]);

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleCompare = (id) => {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return prev; // 最大3社
      return [...prev, id];
    });
  };

  const toggleFilter = (cat) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const displayed = useMemo(() => {
    let list = COMPANIES;
    if (view === 'favorites') {
      list = list.filter(c => favorites.has(c.id));
    }
    list = list.filter(c => activeFilters.has(c.category));
    if (xrOnly) {
      list = list.filter(c => c.xr);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      const xrKeywords = ['xr', 'ar', 'vr', 'mr', 'メタバース', 'バーチャル'];
      const isXrQuery = xrKeywords.some(k => q.includes(k));
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        CATEGORIES[c.category].label.toLowerCase().includes(q) ||
        (isXrQuery && c.xr)
      );
    }
    return list;
  }, [search, activeFilters, view, favorites, xrOnly]);

  const compareCompanies = compareList.map(id => COMPANIES.find(c => c.id === id));

  return (
    <div style={{ minHeight: '100vh', background: '#F9F5EC', color: '#1A1814', fontFamily: "'Noto Sans JP', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500;700;800&family=Noto+Sans+JP:wght@400;500;700&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body { margin: 0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-enter { animation: fadeUp 0.4s ease-out both; }
        .tap:active { transform: scale(0.97); transition: transform 0.1s; }
        .filter-chip { transition: all 0.2s ease; }
        .hover-lift { transition: all 0.25s ease; }
        .hover-lift:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
        input:focus { outline: none; }
      `}</style>

      {/* ヘッダー */}
      <header style={{
        borderBottom: '1px solid #1A1814',
        background: '#F9F5EC',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ padding: '16px 20px 12px' }}>
          {/* タイトル */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 2 }}>
            <div style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: '0.02em',
              lineHeight: 1,
            }}>
              IT企業図鑑
            </div>
            <div style={{ fontSize: 10, letterSpacing: '0.2em', opacity: 0.6 }}>
              THE GUIDE
            </div>
          </div>
          <div style={{ fontSize: 11, opacity: 0.55, letterSpacing: '0.08em', marginBottom: 14 }}>
            就活のための企業リファレンス — 有名{COMPANIES.length}社
          </div>

          {/* ビュー切替 */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 12, borderBottom: '1px solid rgba(26,24,20,0.15)' }}>
            {[
              { id: 'all', label: '一覧', count: COMPANIES.length },
              { id: 'favorites', label: 'お気に入り', count: favorites.size, icon: Heart },
            ].map(v => {
              const active = view === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => setView(v.id)}
                  className="tap"
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '8px 4px',
                    fontSize: 13,
                    fontWeight: active ? 700 : 500,
                    fontFamily: "'Noto Sans JP', sans-serif",
                    color: active ? '#1A1814' : 'rgba(26,24,20,0.5)',
                    borderBottom: active ? '2px solid #1A1814' : '2px solid transparent',
                    marginBottom: -1,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                  }}
                >
                  {v.icon && <v.icon size={13} fill={active ? '#1A1814' : 'none'} />}
                  {v.label}
                  <span style={{
                    fontSize: 10,
                    padding: '1px 6px',
                    borderRadius: 10,
                    background: active ? '#1A1814' : 'rgba(26,24,20,0.1)',
                    color: active ? '#F9F5EC' : 'rgba(26,24,20,0.6)',
                    fontWeight: 700,
                  }}>
                    {v.count}
                  </span>
                </button>
              );
            })}
            {compareList.length > 0 && (
              <button
                onClick={() => setShowCompare(true)}
                className="tap"
                style={{
                  background: '#1A1814',
                  color: '#F9F5EC',
                  border: 'none',
                  padding: '6px 12px',
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: "'Noto Sans JP', sans-serif",
                  marginLeft: 'auto',
                  marginBottom: 4,
                  borderRadius: 2,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                <GitCompare size={12} />
                比較({compareList.length}/3)
              </button>
            )}
          </div>

          {/* 検索 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            borderBottom: '1px solid rgba(26,24,20,0.3)',
            paddingBottom: 6,
          }}>
            <Search size={15} strokeWidth={2} style={{ opacity: 0.5 }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="企業名・事業内容で検索..."
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                fontSize: 14,
                fontFamily: "'Noto Sans JP', sans-serif",
                padding: '4px 0',
                color: '#1A1814',
              }}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, opacity: 0.5 }}>
                <X size={14} />
              </button>
            )}
          </div>

          {/* カテゴリフィルタ */}
          <div style={{ display: 'flex', gap: 6, marginTop: 10, overflowX: 'auto', paddingBottom: 2 }}>
            {Object.entries(CATEGORIES).map(([key, cat]) => {
              const active = activeFilters.has(key);
              return (
                <button
                  key={key}
                  onClick={() => toggleFilter(key)}
                  className="tap filter-chip"
                  style={{
                    background: active ? cat.color : 'transparent',
                    color: active ? '#F9F5EC' : cat.color,
                    border: `1.5px solid ${cat.color}`,
                    padding: '5px 11px',
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: "'Noto Sans JP', sans-serif",
                    borderRadius: 20,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.05em',
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
            <button
              onClick={() => setXrOnly(v => !v)}
              className="tap filter-chip"
              style={{
                background: xrOnly ? 'linear-gradient(135deg, #6B4EE6, #B84EC8)' : 'transparent',
                color: xrOnly ? '#F9F5EC' : '#6B4EE6',
                border: `1.5px solid ${xrOnly ? 'transparent' : '#6B4EE6'}`,
                padding: '5px 11px',
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "'Noto Sans JP', sans-serif",
                borderRadius: 20,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                marginLeft: 4,
                boxShadow: xrOnly ? '0 2px 8px rgba(107,78,230,0.35)' : 'none',
              }}
            >
              <Sparkles size={11} fill={xrOnly ? '#F9F5EC' : 'none'} />
              AR/XR
            </button>
          </div>
        </div>
      </header>

      {/* 本文 */}
      <main style={{ padding: '16px 20px 100px', maxWidth: 720, margin: '0 auto' }}>
        {/* 件数表示 */}
        <div style={{
          fontSize: 11,
          opacity: 0.5,
          letterSpacing: '0.15em',
          marginBottom: 16,
          fontFamily: "'Shippori Mincho', serif",
        }}>
          — {displayed.length} COMPANIES —
        </div>

        {displayed.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', opacity: 0.5 }}>
            <BookOpen size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
            <div style={{ fontSize: 14 }}>
              {view === 'favorites' ? 'お気に入りに登録された企業はありません' : '該当する企業が見つかりませんでした'}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {displayed.map((c, i) => (
              <CompanyCard
                key={c.id}
                company={c}
                category={CATEGORIES[c.category]}
                isFavorite={favorites.has(c.id)}
                isCompared={compareList.includes(c.id)}
                compareDisabled={compareList.length >= 3 && !compareList.includes(c.id)}
                onToggleFavorite={() => toggleFavorite(c.id)}
                onToggleCompare={() => toggleCompare(c.id)}
                index={i}
              />
            ))}
          </div>
        )}

        {/* フッター情報 */}
        <div style={{
          marginTop: 40,
          paddingTop: 20,
          borderTop: '1px solid rgba(26,24,20,0.15)',
          fontSize: 10,
          opacity: 0.5,
          lineHeight: 1.7,
          fontFamily: "'Noto Sans JP', sans-serif",
        }}>
          <div style={{ marginBottom: 6 }}>※ 平均年収は有価証券報告書等の公開情報に基づく参考値(万円)です。年度や集計条件により変動します。</div>
          <div>※ 有名400社を参考に、各カテゴリから代表的な企業を抜粋しています。</div>
        </div>
      </main>

      {/* 比較モーダル */}
      {showCompare && compareCompanies.length > 0 && (
        <CompareModal
          companies={compareCompanies}
          onClose={() => setShowCompare(false)}
          onRemove={(id) => {
            setCompareList(prev => prev.filter(x => x !== id));
            if (compareList.length <= 1) setShowCompare(false);
          }}
        />
      )}
    </div>
  );
}

// ============================================================
// 企業カード
// ============================================================
function CompanyCard({ company, category, isFavorite, isCompared, compareDisabled, onToggleFavorite, onToggleCompare, index }) {
  return (
    <article
      className="card-enter hover-lift"
      style={{
        background: '#FEFCF7',
        border: '1px solid rgba(26,24,20,0.12)',
        borderRadius: 4,
        padding: '14px 16px',
        position: 'relative',
        animationDelay: `${Math.min(index * 30, 300)}ms`,
      }}
    >
      {/* 左縦線 */}
      <div style={{
        position: 'absolute',
        left: 0, top: 0, bottom: 0,
        width: 3,
        background: category.color,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
      }} />

      {/* トップ行: カテゴリ + お気に入り */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: category.color,
            textTransform: 'uppercase',
            padding: '2px 7px',
            background: category.bg,
            borderRadius: 2,
          }}>
            {category.label}
          </div>
          {company.xr && (
            <div style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: '#F9F5EC',
              padding: '2px 7px',
              background: 'linear-gradient(135deg, #6B4EE6, #B84EC8)',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 3,
            }}>
              <Sparkles size={8} fill="#F9F5EC" />
              AR/XR
            </div>
          )}
        </div>
        <button
          onClick={onToggleFavorite}
          className="tap"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            margin: -4,
          }}
          aria-label="お気に入り"
        >
          <Heart
            size={18}
            fill={isFavorite ? '#D4574F' : 'none'}
            color={isFavorite ? '#D4574F' : 'rgba(26,24,20,0.35)'}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* 企業名 */}
      <h2 style={{
        fontFamily: "'Shippori Mincho', serif",
        fontSize: 19,
        fontWeight: 700,
        margin: '4px 0 6px',
        letterSpacing: '0.01em',
        lineHeight: 1.2,
      }}>
        {company.name}
      </h2>

      {/* 年収 */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
        <span style={{ fontSize: 10, opacity: 0.5, letterSpacing: '0.1em' }}>平均年収</span>
        <span style={{
          fontFamily: "'Shippori Mincho', serif",
          fontSize: 22,
          fontWeight: 700,
          color: category.color,
          lineHeight: 1,
        }}>
          {company.salary.toLocaleString()}
        </span>
        <span style={{ fontSize: 11, opacity: 0.7 }}>万円</span>
      </div>

      {/* 説明 */}
      <p style={{
        fontSize: 12.5,
        lineHeight: 1.65,
        color: 'rgba(26,24,20,0.78)',
        margin: '0 0 12px',
      }}>
        {company.description}
      </p>

      {/* アクション */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <a
          href={company.url}
          target="_blank"
          rel="noopener noreferrer"
          className="tap"
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
            background: '#1A1814',
            color: '#F9F5EC',
            textDecoration: 'none',
            padding: '8px 12px',
            fontSize: 12,
            fontWeight: 700,
            borderRadius: 2,
            letterSpacing: '0.05em',
          }}
        >
          採用ページへ
          <ExternalLink size={12} />
        </a>
        <button
          onClick={onToggleCompare}
          disabled={compareDisabled}
          className="tap"
          style={{
            background: isCompared ? category.color : 'transparent',
            color: isCompared ? '#F9F5EC' : compareDisabled ? 'rgba(26,24,20,0.3)' : '#1A1814',
            border: `1px solid ${isCompared ? category.color : 'rgba(26,24,20,0.2)'}`,
            padding: '8px 10px',
            fontSize: 11,
            fontWeight: 700,
            fontFamily: "'Noto Sans JP', sans-serif",
            borderRadius: 2,
            cursor: compareDisabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          {isCompared ? <Check size={12} /> : <GitCompare size={12} />}
          比較
        </button>
      </div>
    </article>
  );
}

// ============================================================
// 比較モーダル
// ============================================================
function CompareModal({ companies, onClose, onRemove }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(26,24,20,0.55)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'flex-end',
        animation: 'fadeUp 0.25s ease-out',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#F9F5EC',
          width: '100%',
          maxHeight: '92vh',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          overflowY: 'auto',
          padding: '20px 16px 24px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <div style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: 22,
              fontWeight: 800,
              lineHeight: 1,
            }}>
              企業比較
            </div>
            <div style={{ fontSize: 10, opacity: 0.5, letterSpacing: '0.15em', marginTop: 4 }}>
              COMPANY COMPARISON
            </div>
          </div>
          <button
            onClick={onClose}
            className="tap"
            style={{
              background: '#1A1814',
              color: '#F9F5EC',
              border: 'none',
              width: 34,
              height: 34,
              borderRadius: 17,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={16} />
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${companies.length}, minmax(180px, 1fr))`,
            gap: 10,
            minWidth: companies.length * 190,
          }}>
            {companies.map(c => {
              const cat = CATEGORIES[c.category];
              return (
                <div key={c.id} style={{
                  background: '#FEFCF7',
                  border: `1px solid ${cat.color}`,
                  borderRadius: 4,
                  padding: 14,
                  position: 'relative',
                }}>
                  <button
                    onClick={() => onRemove(c.id)}
                    style={{
                      position: 'absolute',
                      top: 6, right: 6,
                      background: 'rgba(26,24,20,0.08)',
                      border: 'none',
                      width: 22, height: 22,
                      borderRadius: 11,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <X size={12} />
                  </button>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 6, flexWrap: 'wrap' }}>
                    <div style={{
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      color: cat.color,
                      padding: '2px 6px',
                      background: cat.bg,
                      borderRadius: 2,
                      display: 'inline-block',
                    }}>
                      {cat.label}
                    </div>
                    {c.xr && (
                      <div style={{
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        color: '#F9F5EC',
                        padding: '2px 6px',
                        background: 'linear-gradient(135deg, #6B4EE6, #B84EC8)',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                      }}>
                        <Sparkles size={8} fill="#F9F5EC" />
                        AR/XR
                      </div>
                    )}
                  </div>
                  <h3 style={{
                    fontFamily: "'Shippori Mincho', serif",
                    fontSize: 16,
                    fontWeight: 700,
                    margin: '0 0 10px',
                    lineHeight: 1.25,
                    paddingRight: 22,
                  }}>
                    {c.name}
                  </h3>

                  <CompareRow label="平均年収">
                    <span style={{
                      fontFamily: "'Shippori Mincho', serif",
                      fontSize: 20,
                      fontWeight: 700,
                      color: cat.color,
                    }}>
                      {c.salary.toLocaleString()}
                    </span>
                    <span style={{ fontSize: 10, opacity: 0.6 }}> 万円</span>
                  </CompareRow>

                  <CompareRow label="事業内容">
                    <p style={{
                      fontSize: 11.5,
                      lineHeight: 1.6,
                      margin: 0,
                      color: 'rgba(26,24,20,0.8)',
                    }}>
                      {c.description}
                    </p>
                  </CompareRow>

                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginTop: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 4,
                      background: '#1A1814',
                      color: '#F9F5EC',
                      textDecoration: 'none',
                      padding: '6px 8px',
                      fontSize: 11,
                      fontWeight: 700,
                      borderRadius: 2,
                    }}
                  >
                    採用ページ
                    <ExternalLink size={10} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{
          fontSize: 10,
          opacity: 0.5,
          textAlign: 'center',
          marginTop: 16,
          letterSpacing: '0.1em',
        }}>
          横スクロールで比較できます
        </div>
      </div>
    </div>
  );
}

function CompareRow({ label, children }) {
  return (
    <div style={{ marginBottom: 10, borderTop: '1px solid rgba(26,24,20,0.1)', paddingTop: 8 }}>
      <div style={{
        fontSize: 9,
        opacity: 0.5,
        letterSpacing: '0.12em',
        marginBottom: 4,
        fontWeight: 700,
      }}>
        {label}
      </div>
      <div>{children}</div>
    </div>
  );
}
