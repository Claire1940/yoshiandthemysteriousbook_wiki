import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  CalendarDays,
  Monitor,
  ShoppingCart,
  Star,
  Users2,
  Swords,
  Sparkles,
} from 'lucide-react'

export interface NavigationItem {
	key: string // 用于翻译键，如 'guide' -> t('nav.guide')
	path: string // URL 路径，如 '/guide'
	icon: LucideIcon // Lucide 图标组件
	isContentType: boolean // 是否对应 content/ 目录
}

export const NAVIGATION_CONFIG: NavigationItem[] = [
  { key: 'release', path: '/release', icon: CalendarDays, isContentType: true },
  { key: 'platform', path: '/platform', icon: Monitor, isContentType: true },
  { key: 'purchase', path: '/purchase', icon: ShoppingCart, isContentType: true },
  { key: 'review', path: '/review', icon: Star, isContentType: true },
  { key: 'multiplayer', path: '/multiplayer', icon: Users2, isContentType: true },
  { key: 'guide', path: '/guide', icon: BookOpen, isContentType: true },
  { key: 'bosses', path: '/bosses', icon: Swords, isContentType: true },
  { key: 'features', path: '/features', icon: Sparkles, isContentType: true },
]

// 从配置派生内容类型列表（用于路由和内容加载）
export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
	(item) => item.path.slice(1),
)

export type ContentType = (typeof CONTENT_TYPES)[number]

// 辅助函数：验证内容类型
export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}
