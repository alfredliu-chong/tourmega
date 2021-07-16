export const CHANGE_PAGE = "ui/CHANGE_PAGE"
export const CHANGE_PAGE_SIZE = "ui/CHANGE_PAGE_SIZE"
export const UPDATE_FILTER_FORM = "ui/UPDATE_FILTER_FORM"

export const changePage = (type: string, page: number) => ({
  type: CHANGE_PAGE,
  payload: { type, page }
})

export const changePageSize = (type: string, size: number) => ({
  type: CHANGE_PAGE_SIZE,
  payload: { type, size }
})

export const updateFilterForm = (type: string, data: any) => ({
  type: UPDATE_FILTER_FORM,
  payload: { type, data }
})