
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IconProps {
    id: string;
    isSelected: boolean;
    color?: string;
}

export const FocusAreaIcon: React.FC<IconProps> = ({ id, isSelected }) => {
    const spring: any = { type: "spring", stiffness: 400, damping: 15 };

    // Base colors for "Convincing States"
    const inactiveColor = "#94A3B8"; // Slate 400
    const activeColor = "#FFFFFF";
    const successColor = "#34D399"; // Emerald 400

    switch (id) {
        case 'waste':
            return (
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                    {!isSelected && (
                        <motion.g initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <motion.circle cx="6" cy="18" r="1.5" fill="#B45309" animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 2 }} />
                            <motion.circle cx="18" cy="19" r="1" fill="#78350F" animate={{ y: [0, -1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }} />
                        </motion.g>
                    )}
                    <motion.path
                        d="M5 9H19L17.5 21H6.5L5 9Z"
                        stroke={isSelected ? activeColor : inactiveColor}
                        strokeWidth="2"
                        animate={{ scale: isSelected ? [1, 1.1, 1] : 1 }}
                    />
                    <motion.path
                        d="M4 9H20"
                        stroke={isSelected ? activeColor : inactiveColor}
                        strokeWidth="2"
                        animate={{ rotate: isSelected ? 0 : -45, originX: "20px", originY: "9px" }}
                        transition={spring}
                    />
                    {isSelected && (
                        <motion.path
                            d="M9 15L11 17L15 13"
                            stroke={successColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                        />
                    )}
                </svg>
            );

        case 'water':
            return (
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                    <rect x="6" y="4" width="12" height="16" rx="2" stroke={isSelected ? activeColor : inactiveColor} strokeWidth="1.5" />
                    <motion.path
                        d="M7 18C7 18 8.5 17.5 10 17.5C11.5 17.5 13 18.5 14.5 18.5C16 18.5 17 18 17 18V20H7V18Z"
                        fill={isSelected ? successColor : "#60A5FA"}
                        animate={{
                            y: isSelected ? 0 : -8,
                            d: isSelected
                                ? "M7 18C7 18 8.5 18 10 18C11.5 18 13 18 14.5 18C16 18 17 18 17 18V20H7V18Z"
                                : "M7 18C7 18 8.5 17.5 10 17.5C11.5 17.5 13 18.5 14.5 18.5C16 18.5 17 18 17 18V20H7V18Z"
                        }}
                        transition={spring}
                    />
                    <path d="M18 10H21" stroke={isSelected ? activeColor : inactiveColor} strokeWidth="1.5" />
                    {!isSelected && (
                        <motion.g>
                            <motion.circle cx="19.5" cy="12" r="1" fill="#3B82F6" animate={{ y: [0, 8], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1, ease: "easeIn" }} />
                        </motion.g>
                    )}
                    <motion.circle
                        cx="18" cy="10" r="2.5"
                        stroke={isSelected ? successColor : inactiveColor}
                        strokeWidth="1.5"
                        animate={{ rotate: isSelected ? 180 : 0 }}
                        transition={spring}
                    />
                </svg>
            );

        case 'nature':
            return (
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                    <motion.rect x="4" y="19" width="16" height="2" rx="1" fill={isSelected ? successColor : "#78350F"} />
                    <motion.g animate={{ y: isSelected ? 0 : 4, scale: isSelected ? 1.1 : 1 }}>
                        <motion.path
                            d="M12 19V11"
                            stroke={isSelected ? activeColor : inactiveColor}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                        />
                        {isSelected && (
                            <motion.g>
                                <motion.circle cx="12" cy="7" r="5" fill={successColor} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }} />
                                <motion.circle cx="8" cy="10" r="4" fill={successColor} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5, delay: 0.1 }} />
                                <motion.circle cx="16" cy="10" r="4" fill={successColor} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5, delay: 0.2 }} />
                            </motion.g>
                        )}
                    </motion.g>
                </svg>
            );

        case 'energy':
            return (
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                    <motion.path
                        d="M2 12H6L9 4L15 20L18 12H22"
                        stroke={isSelected ? successColor : "#EF4444"}
                        strokeWidth="1.5"
                        animate={{ pathLength: [0.8, 1, 0.8], opacity: isSelected ? 1 : [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                    <rect x="9" y="8" width="6" height="8" rx="3" stroke={isSelected ? activeColor : inactiveColor} strokeWidth="2" />
                    <AnimatePresence>
                        {isSelected && (
                            <motion.circle
                                cx="12" cy="12" r="10"
                                stroke={successColor}
                                initial={{ scale: 0, opacity: 1 }}
                                animate={{ scale: 2, opacity: 0 }}
                                transition={{ repeat: Infinity, duration: 1 }}
                            />
                        )}
                    </AnimatePresence>
                </svg>
            );

        case 'carbon':
            return (
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                    <motion.path
                        d="M4 20V14L7 14L7 11L11 11L11 14L14 14L14 11L17 11V20H4Z"
                        stroke={isSelected ? successColor : inactiveColor}
                        strokeWidth="2"
                        animate={{ y: isSelected ? 10 : 0, opacity: isSelected ? 0 : 1 }}
                        transition={spring}
                    />
                    {isSelected ? (
                        <motion.g initial={{ scale: 0, y: 10 }} animate={{ scale: 1, y: 0 }} transition={spring}>
                            <motion.circle cx="12" cy="12" r="6" fill="#FBBF24" style={{ filter: "drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))" }} />
                            {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
                                <motion.line
                                    key={angle}
                                    x1="12" y1="12" x2="12" y2="4"
                                    stroke="#FBBF24" strokeWidth="2" strokeLinecap="round"
                                    style={{ transformOrigin: "12px 12px", rotate: `${angle}deg` }}
                                    animate={{ scaleY: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 2, delay: angle / 180 }}
                                />
                            ))}
                        </motion.g>
                    ) : (
                        <motion.g>
                            <motion.circle cx="15" cy="7" r="2" fill="gray" animate={{ y: [0, -10], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 2 }} />
                        </motion.g>
                    )}
                </svg>
            );

        case 'plastic':
            return (
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                    <motion.path
                        d="M10 6V4H14V6L15 8V20H9V8L10 6Z"
                        stroke={isSelected ? successColor : inactiveColor}
                        strokeWidth="2"
                        animate={{ rotate: isSelected ? 90 : 0, scale: isSelected ? 0.3 : 1, opacity: isSelected ? 0.3 : 1 }}
                    />
                    {isSelected && (
                        <motion.path
                            d="M8 12L11 15L16 9"
                            stroke={successColor}
                            strokeWidth="3"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                        />
                    )}
                    <motion.path
                        d="M2 18C4 18 6 16 8 16C10 16 12 18 14 18C16 18 18 16 20 16"
                        stroke={isSelected ? "#34D399" : "#94A3B8"}
                        strokeWidth="2"
                        animate={{ x: isSelected ? [-2, 2] : [-5, 5] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    />
                </svg>
            );

        case 'compost':
            return (
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                    <motion.path
                        d="M4 10H20L18 20H6L4 10Z"
                        stroke={isSelected ? successColor : inactiveColor}
                        strokeWidth="2"
                        animate={{ scale: isSelected ? [1, 1.05, 1] : 1 }}
                    />
                    {isSelected ? (
                        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <motion.path d="M10 15C10 15 11 13 12 13C13 13 14 15 14 15" stroke="#F87171" strokeWidth="2" animate={{ x: [-1, 1] }} transition={{ repeat: Infinity, duration: 1 }} />
                            <circle cx="12" cy="11" r="1.5" fill={successColor} />
                        </motion.g>
                    ) : (
                        <motion.path d="M8 12L10 14L12 12" stroke="#78350F" strokeWidth="1" />
                    )}
                </svg>
            );

        case 'fashion':
            return (
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                    <path d="M9 4L12 2L15 4M5 8H19L20 21H4L5 8Z" stroke={isSelected ? activeColor : inactiveColor} strokeWidth="2" />
                    <motion.rect
                        x="10" y="10" width="4" height="6" rx="1"
                        fill={isSelected ? successColor : "transparent"}
                        stroke={isSelected ? "none" : inactiveColor}
                        animate={{ rotate: isSelected ? [0, 15, -15, 0] : 0, scale: isSelected ? 1.2 : 1 }}
                        transition={{ repeat: isSelected ? Infinity : 0, duration: 2 }}
                    />
                </svg>
            );

        case 'travel':
            return (
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                    <motion.path
                        d="M4 16C4 16 7 12 12 12C17 12 20 16 20 16"
                        stroke={isSelected ? successColor : inactiveColor}
                        strokeWidth="2"
                        animate={{ y: isSelected ? [0, -1, 0] : 0 }}
                        transition={{ repeat: isSelected ? Infinity : 0, duration: 2 }}
                    />
                    <motion.path
                        d="M12 12V6M10 8L12 6L14 8"
                        stroke={isSelected ? activeColor : inactiveColor}
                        strokeWidth="2"
                        animate={{ y: isSelected ? [-2, 0] : 0 }}
                    />
                    {isSelected && (
                        <motion.g stroke={successColor} strokeWidth="1.5" strokeDasharray="2 4">
                            <motion.path d="M4 21H20" animate={{ strokeDashoffset: [0, -8] }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} />
                        </motion.g>
                    )}
                </svg>
            );

        case 'food':
            return (
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                    <motion.circle
                        cx="12" cy="12" r="9"
                        stroke={isSelected ? successColor : inactiveColor}
                        strokeWidth="1.5"
                        animate={{ scale: isSelected ? 1.1 : 1 }}
                    />
                    <motion.g animate={{ scale: isSelected ? 1.2 : 1, y: isSelected ? -1 : 0 }}>
                        <path d="M12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15Z" fill={isSelected ? successColor : "none"} stroke={isSelected ? successColor : inactiveColor} strokeWidth="1.5" />
                        <path d="M12 7V5M11 5C11 5 12 4 14 4" stroke={isSelected ? activeColor : inactiveColor} strokeWidth="1.5" strokeLinecap="round" />
                    </motion.g>
                    {isSelected && (
                        <motion.g stroke={successColor} strokeWidth="1.5" strokeLinecap="round">
                            <motion.path d="M8 4V2" animate={{ y: [0, -4], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2 }} />
                            <motion.path d="M12 3V1" animate={{ y: [0, -4], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.6 }} />
                            <motion.path d="M16 4V2" animate={{ y: [0, -4], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 1.2 }} />
                        </motion.g>
                    )}
                </svg>
            );

        case 'community':
            return (
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                    <motion.circle cx="12" cy="12" r="4" stroke={isSelected ? successColor : inactiveColor} strokeWidth="2" animate={{ scale: isSelected ? 1.2 : 1 }} />
                    <motion.g animate={{ rotate: isSelected ? 360 : 0 }} transition={{ repeat: isSelected ? Infinity : 0, duration: 15, ease: "linear" }}>
                        <circle cx="12" cy="5" r="2.5" fill={isSelected ? successColor : inactiveColor} />
                        <circle cx="12" cy="19" r="2.5" fill={isSelected ? successColor : inactiveColor} />
                        <circle cx="5" cy="12" r="2.5" fill={isSelected ? successColor : inactiveColor} />
                        <circle cx="19" cy="12" r="2.5" fill={isSelected ? successColor : inactiveColor} />
                    </motion.g>
                    {isSelected && (
                        <motion.path
                            d="M12 11C12 11 11.5 9.5 10.5 9.5C9.5 9.5 9 10 9 11C9 12 10.5 14 12 15C13.5 14 15 12 15 11C15 10 14.5 9.5 13.5 9.5C12.5 9.5 12 11 12 11Z"
                            fill="#F87171"
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.3, 1] }}
                            transition={spring}
                        />
                    )}
                </svg>
            );

        case 'ev':
            return (
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                    <motion.path d="M3 15H21V11C21 11 20 8 16 8H8C4 8 3 11 3 11V15Z" stroke={isSelected ? successColor : inactiveColor} strokeWidth="2" animate={{ x: isSelected ? [-0.5, 0.5] : 0 }} transition={{ repeat: Infinity, duration: 0.1 }} />
                    <motion.circle cx="6" cy="17" r="2.5" stroke={isSelected ? activeColor : inactiveColor} strokeWidth="2" animate={{ rotate: isSelected ? 360 : 0 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                    <motion.circle cx="18" cy="17" r="2.5" stroke={isSelected ? activeColor : inactiveColor} strokeWidth="2" animate={{ rotate: isSelected ? 360 : 0 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                    <motion.path
                        d="M12 5L10 10H14L12 15"
                        stroke={isSelected ? "#FBBF24" : "none"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        style={{ filter: "drop-shadow(0 0 4px rgba(251, 191, 36, 0.8))" }}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: isSelected ? 1 : 0 }}
                    />
                    {isSelected && (
                        <motion.g stroke={successColor} strokeWidth="1" strokeLinecap="round">
                            <motion.path d="M22 13H24" animate={{ x: [0, 4], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} />
                            <motion.path d="M22 15H24" animate={{ x: [0, 4], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                        </motion.g>
                    )}
                </svg>

            );

        case 'lifestyle':
            return (
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                    <motion.circle
                        cx="12" cy="12" r="10"
                        stroke={isSelected ? successColor : inactiveColor}
                        strokeWidth="2"
                        animate={{ scale: isSelected ? [1, 1.1, 1] : 1, strokeDasharray: isSelected ? "4 2" : "none" }}
                        transition={{ repeat: isSelected ? Infinity : 0, duration: 2 }}
                    />
                    <motion.path
                        d="M12 6V12L16 14"
                        stroke={isSelected ? activeColor : inactiveColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        animate={{ rotate: isSelected ? 360 : 0, originX: "12px", originY: "12px" }}
                        transition={isSelected ? { repeat: Infinity, duration: 4, ease: "linear" } : spring}
                    />
                    {isSelected && (
                        <motion.circle cx="12" cy="12" r="2" fill={successColor} initial={{ scale: 0 }} animate={{ scale: 1 }} />
                    )}
                </svg>
            );

        default:
            return (
                <motion.div
                    animate={{ scale: isSelected ? [1, 1.2, 1] : 1, rotate: isSelected ? [0, 10, -10, 0] : 0 }}
                    transition={spring}
                >
                    <i className={`fas fa-star text-2xl ${isSelected ? 'text-[var(--emerald)]' : 'text-slate-300'}`}></i>
                </motion.div>
            );
    }
};
