import { useDispatch as useReduxDispatch } from "react-redux"

import { AppDispatch } from "@/renderer/app/store"

// AppDispatch contains typing information
export const useDispatch = () => useReduxDispatch<AppDispatch>()
