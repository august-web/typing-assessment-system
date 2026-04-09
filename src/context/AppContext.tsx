import React, { createContext, useReducer, ReactNode } from 'react'
import { AppState, AssessmentResult } from '../types'

type AppAction =
  | { type: 'SET_STUDENT_NAME'; payload: string }
  | { type: 'START_EXAM' }
  | { type: 'FINISH_EXAM' }
  | { type: 'SET_RESULT'; payload: AssessmentResult }
  | { type: 'GO_TO_LEADERBOARD' }
  | { type: 'RESET_TO_WELCOME' }

const initialState: AppState = {
  currentScreen: 'welcome',
  studentName: '',
  timeRemaining: 1800,
  typedText: '',
  currentResult: null
}

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_STUDENT_NAME':
      return { ...state, studentName: action.payload }
    case 'START_EXAM':
      return { ...state, currentScreen: 'exam' }
    case 'FINISH_EXAM':
      return { ...state, currentScreen: 'results' }
    case 'SET_RESULT':
      return { ...state, currentResult: action.payload }
    case 'GO_TO_LEADERBOARD':
      return { ...state, currentScreen: 'leaderboard' }
    case 'RESET_TO_WELCOME':
      return { ...initialState }
    default:
      return state
  }
}

interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<AppAction>
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = (): AppContextType => {
  const context = React.useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}
