import { Center } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { createContext, useState } from 'react';
const initialState = false;

export const LoadingContext = createContext(initialState);

export function LoadingStore({ children }) {
    const [state, setState] = useState(initialState);

    return (
        <LoadingContext.Provider value={[state, setState]}>
            {state && (
                <Center
                    position="fixed"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    zIndex="calc(var(--chakra-zIndices-modal) + 1)"
                    bgColor="blackAlpha.600"
                >
                    <motion.div
                        className="loading"
                        animate={{
                            scale: [1, 2, 2, 1, 1],
                            rotate: [0, 0, 180, 180, 0],
                            borderRadius: ['0%', '0%', '50%', '50%', '0%'],
                        }}
                        transition={{
                            duration: 2,
                            ease: 'easeInOut',
                            times: [0, 0.2, 0.5, 0.8, 1],
                            repeat: Infinity,
                            repeatDelay: 1,
                        }}
                    />
                </Center>
            )}
            {children}
        </LoadingContext.Provider>
    );
}
