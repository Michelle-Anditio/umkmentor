import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { predictProduct } from '../services/productApi'
import { predictSentiment } from '../services/sentimentApi'
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
import '../css/style.css'

const initialFormData = {
  produk: '',
  harga: '',
  modal: '',
  diskon: 0,
  stok: '',
  is_official: false,
  is_topads: false,
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
      const productPromise = predictProduct({
        kategori: formData.produk,
        harga_jual: hargaJual,
        harga_diskon: hargaDiskon,
        stok: parseInt(formData.stok) || 0,
        is_official: formData.is_official ? 1 : 0,
        rating_average: parseFloat(formData.rating_average) || 5,
        is_topads: formData.is_topads ? 1 : 0,
      })

      const sentimentPromise = formData.produk === 'elektronik'
        ? predictSentiment(
            formData.deskripsi
              ? [formData.deskripsi]
              : ['produk bagus dan awet', 'pengiriman cepat', 'barang tidak sesuai deskripsi']
          )
        : Promise.resolve(null)

      const [productResult, sentimentResult] = await Promise.all([productPromise, sentimentPromise])

      setProductData(productResult)
      setSentimentData(sentimentResult)
      setResultData({ hargaJual, hargaDiskon, kategori: formData.produk, kategoriLabel })
      setAnalysisState('done')
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
        />
        <ProfitabilitySection />
        <ExpertsSection />
      </main>

      <Footer />
    </>
  )
}