import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { predictProduct } from '../services/productApi'
import { getSentimentSummary } from '../services/sentimentApi'
import { KATEGORI_OPTIONS } from '../constants/categories'
import Navbar from '../components/home/Navbar'
import HeroSection from '../components/home/HeroSection'
import HowItWorksSection from '../components/home/HowItWorksSection'
import FeaturesSection from '../components/home/FeaturesSection'
import ProfitabilitySection from '../components/home/ProfitabilitySection'
import ConsultationSection from '../components/home/ConsultationSection'
import ProductAnalysisSection from '../components/home/ProductAnalysisSection'
import ExpertsSection from '../components/home/ExpertsSection'
import Footer from '../components/home/Footer'
import AboutModal from '../components/home/AboutModal'
import KonsultasiChat from './KonsultasiChat'
import '../css/style.css'

const initialFormData = {
  produk: '',
  harga: '',
  modal: '',
  diskon: 0,
  stok: '',
  is_official: false,
  gold_merchant: false,
  rating_average: 5,
  deskripsi: '',
}


export default function HomePage() {
  const [user, setUser] = useState(null)
  const [navOpen, setNavOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState('potensi')
  const [analysisState, setAnalysisState] = useState('idle')
  const [formData, setFormData] = useState(initialFormData)
  const [resultData, setResultData] = useState(null)
  const [sentimentData, setSentimentData] = useState(null)
  const [productData, setProductData] = useState(null)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const handleKonsultasi = () => {
    if (!user) {
      alert('Silakan login terlebih dahulu untuk menggunakan UMKMentor AI 😊')
      window.location.href = '/login'
      return
    }
  
    setShowChat(true)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => setUser(currentUser))
    return () => unsubscribe()
  }, [])

  const runAnalysis = async () => {
    if (!formData.produk) {
      alert('Pilih kategori produk dulu ya!')
      return
    }

    if (!formData.harga) {
      alert('Isi harga jual dulu ya!')
      return
    }

    setAnalysisState('loading')
    setSentimentData(null)
    setProductData(null)

    const hargaJual = parseInt(String(formData.harga).replace(/\D/g, '')) || 0
    const diskonPersen = parseFloat(formData.diskon) || 0
    const hargaDiskon = Math.round(hargaJual - hargaJual * (diskonPersen / 100))

    const kategoriLabel =
      KATEGORI_OPTIONS.find(kategori => kategori.value === formData.produk)?.label ||
      formData.produk

    try {
      const discountedPrice =
        diskonPersen > 0 ? hargaDiskon : null

      const productPromise = predictProduct({
        kategori: formData.produk,
        harga_jual: hargaJual,
        discounted_price: discountedPrice,
        stok: parseInt(formData.stok) || 0,
        is_official: formData.is_official ? 1 : 0,
        rating_average: parseFloat(formData.rating_average) || 5,
        gold_merchant: formData.gold_merchant ? 1 : 0,
      })
      
      const sentimentPromise = getSentimentSummary(
        formData.deskripsi
          ? [formData.deskripsi]
          : ['produk bagus dan awet', 'pengiriman cepat', 'barang tidak sesuai deskripsi']
      )
      
      const [productResult, sentimentResult] = await Promise.all([productPromise, sentimentPromise])

      setProductData(productResult)
      setSentimentData(sentimentResult?.[formData.produk] || null)
      setResultData({ hargaJual, hargaDiskon, kategori: formData.produk, kategoriLabel })
      setAnalysisState('done')

      if (user) {
        await addDoc(collection(db, 'riwayat'), {
          uid: user.uid,
          namaProduk: formData.produk,
          kategoriLabel,
          harga_jual: hargaJual,
          harga_diskon: hargaDiskon,
          prediction: productResult.prediction,
          laku_score: productResult.laku_score,
          risk_level: productResult.risk_level,
          harga_median_cat: productResult.harga_median_cat,
          stock_median_cat: productResult.stock_median_cat,
          cat_pct_official: productResult.cat_pct_official,
          saran: productResult.saran || [],
          sentimen_positif: sentimentResult?.[formData.produk]?.positive || null,
          sentimen_negatif: sentimentResult?.[formData.produk]?.negative || null,
          sentimen_netral: sentimentResult?.[formData.produk]?.neutral || null,
          createdAt: serverTimestamp(),
        })
      }

    } catch (error) {
      console.error('Gagal analisis detail:', error)
      alert(error.message)
      setAnalysisState('idle')
    }
  }

  return (
    <>
      <Navbar user={user} navOpen={navOpen} onToggleNav={() => setNavOpen(open => !open)} />

      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection activeFeature={activeFeature} onChangeFeature={setActiveFeature} />
        <ConsultationSection />
        <ProductAnalysisSection
          formData={formData}
          setFormData={setFormData}
          runAnalysis={runAnalysis}
          analysisState={analysisState}
          resultData={resultData}
          productData={productData}
          sentimentData={sentimentData}
          onKonsultasi={handleKonsultasi}
        />
        <ProfitabilitySection />
        <ExpertsSection />
      </main>

      <Footer onAboutClick={() => setIsAboutOpen(true)} />
      
      {showChat && (
        <KonsultasiChat
          productData={productData}
          sentimentData={sentimentData}
          onClose={() => setShowChat(false)}
        />
      )}

      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </>
  )
}