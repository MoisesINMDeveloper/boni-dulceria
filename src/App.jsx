import { Home, MessageCircle, ShoppingBag, UtensilsCrossed } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import CartDrawer from './components/CartDrawer.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import MenuSection from './components/MenuSection.jsx'
import Navbar from './components/Navbar.jsx'
import { getWhatsAppUrl } from './data/contact.js'
import { branches } from './data/products.js'

export default function App() {
  const [branchId, setBranchId] = useState(branches[0].id)
  const [cartsByBranch, setCartsByBranch] = useState(() =>
    Object.fromEntries(branches.map((branch) => [branch.id, []])),
  )
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const cart = cartsByBranch[branchId]
  const branchName = branches.find((branch) => branch.id === branchId).name

  const changeQuantity = useCallback((productId, quantity) => {
    setCartsByBranch((current) => ({
      ...current,
      [branchId]: current[branchId].flatMap((item) => {
        if (item.product.id !== productId) return [item]
        return quantity < 1 ? [] : [{ ...item, quantity }]
      }),
    }))
  }, [branchId])

  const addToCart = useCallback((product) => {
    setCartsByBranch((current) => {
      const branchCart = current[branchId]
      const existingItem = branchCart.find((item) => item.product.id === product.id)
      if (existingItem) {
        return {
          ...current,
          [branchId]: branchCart.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }
      }
      return { ...current, [branchId]: [...branchCart, { product, quantity: 1 }] }
    })
  }, [branchId])

  const setProductQuantity = useCallback((product, quantity) => {
    setCartsByBranch((current) => {
      const branchCart = current[branchId]
      if (quantity < 1) {
        return {
          ...current,
          [branchId]: branchCart.filter((item) => item.product.id !== product.id),
        }
      }
      const existingItem = branchCart.find((item) => item.product.id === product.id)
      const updatedCart = existingItem
        ? branchCart.map((item) =>
            item.product.id === product.id ? { ...item, quantity } : item,
          )
        : [...branchCart, { product, quantity }]
      return { ...current, [branchId]: updatedCart }
    })
  }, [branchId])

  const removeFromCart = useCallback((productId) => {
    setCartsByBranch((current) => ({
      ...current,
      [branchId]: current[branchId].filter((item) => item.product.id !== productId),
    }))
  }, [branchId])

  const openCart = useCallback(() => setIsCartOpen(true), [])
  const closeCart = useCallback(() => setIsCartOpen(false), [])
  const changeBranch = useCallback((nextBranchId) => {
    setBranchId(nextBranchId)
    setSearchQuery('')
  }, [])

  const { cartCount, total, quantities } = useMemo(
    () => {
      const summary = cart.reduce(
        (result, item) => ({
          cartCount: result.cartCount + item.quantity,
          total: result.total + item.product.price * item.quantity,
          quantities: { ...result.quantities, [item.product.id]: item.quantity },
        }),
        { cartCount: 0, total: 0, quantities: {} },
      )
      return summary
    },
    [cart],
  )

  return (
    <>
      <Navbar
        branchId={branchId}
        onChangeBranch={changeBranch}
        cartCount={cartCount}
        onOpenCart={openCart}
        onSearch={setSearchQuery}
      />
      <main>
        <Hero branchId={branchId} branchName={branchName} />
        <MenuSection
          branchId={branchId}
          onAdd={addToCart}
          onSetQuantity={setProductQuantity}
          quantities={quantities}
          searchQuery={searchQuery}
        />
        <Footer />
      </main>
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="fixed bottom-5 right-5 z-30 hidden h-14 w-14 items-center justify-center rounded-full bg-caramel text-white shadow-[0_8px_26px_rgba(179,87,24,0.28)] transition hover:scale-105 hover:bg-taupe sm:flex sm:bottom-7 sm:right-7"
      >
        <MessageCircle size={25} />
      </a>
      <nav aria-label="Navegación móvil" className="mobile-tabbar">
        <a href="#inicio" className="mobile-tab">
          <Home size={20} strokeWidth={1.8} />
          <span>Inicio</span>
        </a>
        <a href="#menu" className="mobile-tab">
          <UtensilsCrossed size={20} strokeWidth={1.8} />
          <span>Menú</span>
        </a>
        <button type="button" onClick={openCart} className="mobile-tab relative">
          <span className="relative">
            <ShoppingBag size={20} strokeWidth={1.8} />
            {cartCount > 0 && <span className="tabbar-badge">{cartCount}</span>}
          </span>
          <span>Mi pedido</span>
        </button>
        <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer" className="mobile-tab">
          <MessageCircle size={20} strokeWidth={1.8} />
          <span>Ayuda</span>
        </a>
      </nav>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        cart={cart}
        onChangeQuantity={changeQuantity}
        onRemove={removeFromCart}
        total={total}
        branchName={branchName}
      />
    </>
  )
}
