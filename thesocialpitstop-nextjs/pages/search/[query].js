import { useRouter } from 'next/router'

const SearchPage = () => {
  const router = useRouter()
  const { pid } = router.query

  return <p>Post: {pid}</p>
}

export default SearchPage;
