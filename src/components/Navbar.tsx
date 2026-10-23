import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp, AppTab, Programme } from '../context/AppContext';
import { StudentSelfCheck } from './StudentSelfCheck';
import { CourseSwitch } from './CourseSwitch';
import { useTheme } from '../context/ThemeContext';
import {
  BookOpen,
  FlaskConical,
  GraduationCap,
  AlertCircle,
  Users,
  LayoutDashboard,
  BookMarked,
  Sun,
  Moon,
  Calculator,
  Grid,
  Gamepad2,
  ChevronDown,
  X
} from 'lucide-react';

interface NavLink {
  id: AppTab;
  labelEn: string;
  labelMn: string;
  descEn: string; // one line, so a student knows what the tool is for
  descMn: string;
  icon: React.ReactNode;
  badge?: number;
  courses?: Programme[]; // the courses the tool belongs to; left out means both
}

interface NavGroup {
  id: string;
  titleEn: string;
  titleMn: string;
  items: NavLink[];
}

const badgeEl = (count: number) => (
  <span className="ml-1 px-1.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">{count}</span>
);

const activeCls =
  'bg-emerald-50 text-emerald-800 dark:bg-slate-800 dark:text-teal-300 font-bold border border-emerald-200/80 dark:border-slate-700';
const idleCls = 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900';

const groupBadge = (group: NavGroup) => group.items.reduce((sum, i) => sum + (i.badge ?? 0), 0);

// Group heading: tap to fold the group away. A folded group still shows its open count.
const GroupHeader: React.FC<{ title: string; open: boolean; badge: number; onToggle: () => void }> = ({
  title,
  open,
  badge,
  onToggle
}) => (
  <button
    onClick={onToggle}
    aria-expanded={open}
    className="w-full flex items-center justify-between gap-2 px-2 pt-1 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
  >
    <span>{title}</span>
    <span className="flex items-center">
      {!open && badge > 0 && badgeEl(badge)}
      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? '' : '-rotate-90'}`} />
    </span>
  </button>
);

// Desktop dropdown: one button that opens the student area, sorted into groups
const NavDropdown: React.FC<{
  label: string;
  icon: React.ReactNode;
  groups: NavGroup[];
  header?: React.ReactNode;
  activeTab: AppTab;
  mn: boolean;
  onSelect: (id: AppTab) => void;
  closedGroups: Record<string, boolean>;
  onToggleGroup: (id: string) => void;
}> = ({ label, icon, groups, header, activeTab, mn, onSelect, closedGroups, onToggleGroup }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const items = groups.flatMap(g => g.items);
  const isActive = items.some(i => i.id === activeTab);
  const badge = items.reduce((sum, i) => sum + (i.badge ?? 0), 0);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${isActive ? activeCls : idleCls}`}
      >
        {icon}
        <span>{label}</span>
        {badge > 0 && badgeEl(badge)}
        <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1.5 w-[22rem] p-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg z-50 space-y-2">
          {header}
          {groups.map(group => (
            <div key={group.id}>
              <GroupHeader
                title={mn ? group.titleMn : group.titleEn}
                open={!closedGroups[group.id]}
                badge={groupBadge(group)}
                onToggle={() => onToggleGroup(group.id)}
              />
              {!closedGroups[group.id] && group.items.map(item => {
                const selected = item.id === activeTab;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelect(item.id);
                      setOpen(false);
                    }}
                    className={`w-full flex items-start gap-2.5 px-2.5 py-2 rounded-xl text-left transition-colors ${
                      selected ? 'bg-emerald-50 dark:bg-slate-800' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span
                      className={`mt-0.5 shrink-0 ${
                        selected ? 'text-emerald-700 dark:text-teal-300' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span
                        className={`block text-xs font-semibold ${
                          selected ? 'text-emerald-800 dark:text-teal-300' : 'text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {mn ? item.labelMn : item.labelEn}
                      </span>
                      <span className="block text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                        {mn ? item.descMn : item.descEn}
                      </span>
                    </span>
                    {item.badge !== undefined && badgeEl(item.badge)}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const Navbar: React.FC = () => {
  const { mode, setMode } = useLanguage();
  const { activeTab, setActiveTab, role, setRole, mistakes, programme, courseChoice } = useApp();
  const { theme, toggleTheme } = useTheme();
  // Mobile: whether the student-area tools are expanded under the tab bar
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  // Student-area groups the student has folded away (both desktop and phone)
  const [closedGroups, setClosedGroups] = useState<Record<string, boolean>>({});
  const toggleGroup = (id: string) => setClosedGroups(prev => ({ ...prev, [id]: !prev[id] }));

  const mn = mode === 'mn';
  const unresolvedMistakesCount = mistakes.filter(m => !m.resolved).length;

  // Top-level tabs
  const dashboard: NavLink = {
    id: 'dashboard',
    labelEn: 'Dashboard',
    labelMn: 'Dashboard',
    descEn: '',
    descMn: '',
    icon: <LayoutDashboard className="w-4 h-4" />
  };
  const curriculum: NavLink = {
    id: 'curriculum',
    labelEn: 'Syllabus & Lessons',
    labelMn: 'Хичээлүүд',
    descEn: '',
    descMn: '',
    icon: <BookOpen className="w-4 h-4" />
  };
  const periodic: NavLink = {
    id: 'periodictable',
    labelEn: 'Periodic Table',
    labelMn: 'Үелэх хүснэгт',
    descEn: '',
    descMn: '',
    icon: <Grid className="w-4 h-4" />
  };
  const teacher: NavLink = {
    id: 'teacher',
    labelEn: 'Teacher Area',
    labelMn: 'Багшийн талбар',
    descEn: '',
    descMn: '',
    icon: <Users className="w-4 h-4" />
  };

  // The student area, sorted by what a student does with it: revise, practise, then lab and games
  const studentGroups: NavGroup[] = [
    {
      id: 'revise',
      titleEn: 'Revise',
      titleMn: 'Давтах',
      items: [
        {
          id: 'skills',
          labelEn: 'Exam Skills',
          labelMn: 'Шалгалтын ур чадвар',
          descEn: 'Command words and answer technique',
          descMn: 'Даалгаврын үг, хариулах арга',
          icon: <BookMarked className="w-4 h-4" />
        }
      ]
    },
    {
      id: 'practise',
      titleEn: 'Practise',
      titleMn: 'Дасгалжуулах',
      items: [
        {
          id: 'mistakes',
          labelEn: 'Mistake Notebook',
          labelMn: 'Алдааны сан',
          descEn: 'Questions you missed, to fix',
          descMn: 'Алдсан асуултууд, засах',
          icon: <AlertCircle className="w-4 h-4" />,
          badge: unresolvedMistakesCount > 0 ? unresolvedMistakesCount : undefined
        },
        {
          id: 'exam',
          courses: ['igcse'],
          labelEn: 'Past Papers',
          labelMn: 'Өмнөх жилийн шалгалт',
          descEn: '0620 timed papers, 2017–2024',
          descMn: '0620 цагтай шалгалт, 2017–2024',
          icon: <GraduationCap className="w-4 h-4" />
        },
        {
          id: 'calculations',
          labelEn: 'Calculations',
          labelMn: 'Тооцооны бодлого',
          descEn: 'Calculators and worked numbers',
          descMn: 'Тооцоолуур, тооны бодлого',
          icon: <Calculator className="w-4 h-4" />
        }
      ]
    },
    {
      id: 'lab',
      titleEn: 'Lab & games',
      titleMn: 'Лаборатори, тоглоом',
      items: [
        {
          id: 'labs',
          labelEn: 'Virtual Labs',
          labelMn: 'Виртуал лаб',
          descEn: 'Simulations and external lab resources',
          descMn: 'Симуляци, гадаад лабораторийн нөөц',
          icon: <FlaskConical className="w-4 h-4" />
        },
        {
          id: 'games',
          labelEn: programme === 'alevel' ? 'Key terms & games' : 'Words & games',
          labelMn: programme === 'alevel' ? 'Түлхүүр үг, тоглоом' : 'Үг ба тоглоом',
          descEn: programme === 'alevel' ? '9701 key terms, learned by playing' : '0620 key words: cards and game',
          descMn: programme === 'alevel' ? '9701-ийн түлхүүр үгийг тоглож цээжлэх' : '0620-ийн түлхүүр үг: карт ба тоглоом',
          icon: <Gamepad2 className="w-4 h-4" />
        }
      ]
    }
  ];

  // Only the tools of the course being studied: 0620 tools never show under 9701, and the reverse
  // The A Level choice has its own student menu: the A Level lessons, the 9701 periodic table and the practice that covers them
  const alevelStudentGroups: NavGroup[] = [
    {
      id: 'a-learn',
      titleEn: 'A Level',
      titleMn: 'A Level',
      items: [
        {
          id: 'curriculum',
          labelEn: 'A Level lessons',
          labelMn: 'A Level хичээл',
          descEn: 'Topics 23–37, one by one',
          descMn: 'Сэдэв 23–37, нэг бүрчлэн',
          icon: <BookOpen className="w-4 h-4" />
        },
        {
          id: 'periodictable',
          labelEn: 'Periodic Table (9701)',
          labelMn: 'Үелэх систем (9701)',
          descEn: 'Subshells and the 9701 trends',
          descMn: '9701-ийн дэд бүрхүүл ба зүй тогтол',
          icon: <FlaskConical className="w-4 h-4" />
        }
      ]
    },
    {
      id: 'a-practise',
      titleEn: 'Practise',
      titleMn: 'Дасгалжуулах',
      items: [
        {
          id: 'games',
          labelEn: 'Key terms & games',
          labelMn: 'Түлхүүр үг, тоглоом',
          descEn: '9701 key terms, learned by playing',
          descMn: '9701-ийн түлхүүр үгийг тоглож цээжлэх',
          icon: <Gamepad2 className="w-4 h-4" />
        },
        {
          id: 'mistakes',
          labelEn: 'Mistake Notebook',
          labelMn: 'Алдааны сан',
          descEn: 'Questions you missed, to fix',
          descMn: 'Алдсан асуултууд, засах',
          icon: <AlertCircle className="w-4 h-4" />,
          badge: unresolvedMistakesCount > 0 ? unresolvedMistakesCount : undefined
        }
      ]
    }
  ];

  const visibleGroups: NavGroup[] = courseChoice === 'a' ? alevelStudentGroups : studentGroups
    .map(g => ({ ...g, items: g.items.filter(i => !i.courses || i.courses.includes(programme)) }))
    .filter(g => g.items.length > 0);
  const studentLinks = visibleGroups.flatMap(g => g.items);
  const studentLabel = courseChoice === 'a'
    ? (mn ? 'A Level суралцагчийн талбар' : 'A Level Student Area')
    : (mn ? 'Суралцагчийн талбар' : 'Student Area');
  const courseTag = programme === 'alevel' ? '9701' : '0620';
  const studentBadge = studentLinks.reduce((sum, i) => sum + (i.badge ?? 0), 0);
  const studentActive = studentLinks.some(i => i.id === activeTab);

  const directButton = (link: NavLink) => {
    const active = activeTab === link.id;
    return (
      <button
        onClick={() => setActiveTab(link.id)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${active ? activeCls : idleCls}`}
      >
        {link.icon}
        <span>{mn ? link.labelMn : link.labelEn}</span>
      </button>
    );
  };

  // Mobile top-level tab: icon + short label, dot when something needs attention
  const mobileTab = (
    key: string,
    label: string,
    icon: React.ReactNode,
    active: boolean,
    badge: number,
    onClick: () => void,
    expanded?: boolean
  ) => (
    <button
      key={key}
      onClick={onClick}
      aria-expanded={expanded}
      className={`relative flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-xl text-[11px] font-semibold transition-colors ${
        active ? 'bg-emerald-100 text-emerald-800 dark:bg-teal-500/20 dark:text-teal-300 font-bold' : 'text-slate-600 dark:text-slate-400'
      }`}
    >
      {icon}
      <span className="truncate max-w-full">{label}</span>
      {badge > 0 && <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-rose-500" />}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-teal-400 transition-colors shrink-0 flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-teal-500/20 border border-emerald-500/30 dark:border-teal-500/40 flex items-center justify-center text-emerald-600 dark:text-teal-300 shadow-xs">
            <FlaskConical className="w-4 h-4" />
          </div>
          <span className="hidden sm:inline-block min-w-0 truncate max-w-[14rem] xl:max-w-none">Cambridge Chemistry 0620 · 9701 Study Hub</span>
        </button>

        {/* Zone 2: Navigation — five top-level tabs, student tools in one dropdown */}
        <nav className="hidden xl:flex items-center gap-1">
          {directButton(dashboard)}
          {directButton(curriculum)}
          <NavDropdown
            label={studentLabel}
            icon={<GraduationCap className="w-4 h-4" />}
            groups={visibleGroups}
            header={<StudentSelfCheck mn={mn} programme={programme} onOpenProgress={() => setActiveTab('curriculum')} />}
            closedGroups={closedGroups}
            onToggleGroup={toggleGroup}
            activeTab={activeTab}
            mn={mn}
            onSelect={setActiveTab}
          />
          {directButton(periodic)}
          {directButton(teacher)}
        </nav>

        {/* Zone 3: Actions (Theme, Language, Role) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Theme Toggle (Light / Dark) */}
          <button
            onClick={toggleTheme}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Soft Nature Light Mode'}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-teal-400 transition-colors shadow-xs"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Course switch: IGCSE 0620 or AS & A Level 9701. Collapsed it names the course on screen; open, it lists all three. */}
          <CourseSwitch />

          {/* Language Selector Segmented Control */}
          <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs shadow-xs">
            <button
              onClick={() => setMode('en')}
              className={`px-2 py-1 rounded-lg font-medium transition-colors ${
                mode === 'en' ? 'bg-white dark:bg-teal-500/20 text-emerald-800 dark:text-teal-300 font-bold shadow-xs border border-slate-200 dark:border-teal-500/40' : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setMode('mn')}
              className={`px-2 py-1 rounded-lg font-medium transition-colors ${
                mode === 'mn' ? 'bg-white dark:bg-teal-500/20 text-emerald-800 dark:text-teal-300 font-bold shadow-xs border border-slate-200 dark:border-teal-500/40' : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
              }`}
            >
              MN
            </button>
            <button
              onClick={() => setMode('dual')}
              className={`px-2 py-1 rounded-lg font-medium transition-colors ${
                mode === 'dual' ? 'bg-white dark:bg-teal-500/20 text-emerald-800 dark:text-teal-300 font-bold shadow-xs border border-slate-200 dark:border-teal-500/40' : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
              }`}
              title="Dual English & Mongolian"
            >
              Dual
            </button>
          </div>

          {/* Role Switcher */}
          <button
            onClick={() => setRole(role === 'student' ? 'teacher' : 'student')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap hidden sm:flex items-center gap-1.5 shadow-xs ${
              role === 'teacher'
                ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-300 dark:border-purple-600 text-purple-800 dark:text-purple-200'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{role === 'student' ? (mn ? 'Сурагч' : 'Student') : (mn ? 'Багш' : 'Teacher')}</span>
          </button>
        </div>
      </div>

      {/* Mobile: five top-level tabs; Student Area opens its tools below the bar */}
      <div className="xl:hidden relative bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-5 gap-1 px-2 py-2">
          {mobileTab(
            'dashboard',
            mn ? 'Хяналт' : 'Dashboard',
            dashboard.icon,
            activeTab === 'dashboard',
            0,
            () => {
              setMobileOpen(false);
              setActiveTab('dashboard');
            }
          )}
          {mobileTab(
            'curriculum',
            mn ? 'Хичээл' : 'Lessons',
            curriculum.icon,
            activeTab === 'curriculum',
            0,
            () => {
              setMobileOpen(false);
              setActiveTab('curriculum');
            }
          )}
          {mobileTab(
            'student',
            mn ? 'Суралцагч' : 'Student',
            <GraduationCap className="w-4 h-4" />,
            studentActive || mobileOpen,
            studentBadge,
            () => setMobileOpen(o => !o),
            mobileOpen
          )}
          {mobileTab(
            'periodic',
            mn ? 'Үелэх' : 'Periodic',
            periodic.icon,
            activeTab === 'periodictable',
            0,
            () => {
              setMobileOpen(false);
              setActiveTab('periodictable');
            }
          )}
          {mobileTab(
            'teacher',
            mn ? 'Багш' : 'Teacher',
            teacher.icon,
            activeTab === 'teacher',
            0,
            () => {
              setMobileOpen(false);
              setActiveTab('teacher');
            }
          )}
        </div>

        {/* Overlay under the tab bar: it opens where the student tapped, even when the page is scrolled */}
        {mobileOpen && (
          <div className="absolute left-0 right-0 top-full z-50 max-h-[70vh] overflow-y-auto px-3 pt-2 pb-3 space-y-3 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-lg">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">{studentLabel} · {courseTag}</span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label={mn ? 'Хаах' : 'Close'}
                className="p-1 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <StudentSelfCheck mn={mn} programme={programme} onOpenProgress={() => { setMobileOpen(false); setActiveTab('curriculum'); }} />
            {visibleGroups.map(group => (
              <div key={group.id} className="space-y-1.5">
                <GroupHeader
                  title={mn ? group.titleMn : group.titleEn}
                  open={!closedGroups[group.id]}
                  badge={groupBadge(group)}
                  onToggle={() => toggleGroup(group.id)}
                />
                {!closedGroups[group.id] && (
                <div className="grid grid-cols-2 gap-1.5">
                  {group.items.map(item => {
                    const selected = item.id === activeTab;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMobileOpen(false);
                        }}
                        className={`flex flex-col items-start gap-1 p-2.5 rounded-xl text-left border transition-colors ${
                          selected
                            ? 'bg-emerald-100 border-emerald-300 dark:bg-teal-500/20 dark:border-teal-500/40'
                            : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <span className="flex items-center gap-1.5 w-full">
                          <span
                            className={`shrink-0 ${
                              selected ? 'text-emerald-700 dark:text-teal-300' : 'text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            {item.icon}
                          </span>
                          <span
                            className={`flex-1 min-w-0 text-xs font-semibold leading-tight ${
                              selected ? 'text-emerald-800 dark:text-teal-300' : 'text-slate-800 dark:text-slate-200'
                            }`}
                          >
                            {mn ? item.labelMn : item.labelEn}
                          </span>
                          {item.badge !== undefined && badgeEl(item.badge)}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                          {mn ? item.descMn : item.descEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
