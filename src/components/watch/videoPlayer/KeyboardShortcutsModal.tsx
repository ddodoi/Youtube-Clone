import styled from 'styled-components';

interface ShortcutInfo {
    key: string;
    description: string;
    category: 'playback' | 'navigation' | 'volume' | 'other';
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const shortcuts: ShortcutInfo[] = [
    { key: 'space/k', description: '재생/일시정지', category: 'playback' },
    { key: 'j', description: '10초 뒤로', category: 'navigation' },
    { key: 'l', description: '10초 앞으로', category: 'navigation' },
    { key: 'f', description: '전체화면', category: 'other' },
    { key: 'm', description: '음소거', category: 'volume' },
    { key: '←', description: '5초 뒤로', category: 'navigation' },
    { key: '→', description: '5초 앞으로', category: 'navigation' },
    { key: '↑', description: '볼륨 높이기', category: 'volume' },
    { key: '↓', description: '볼륨 낮추기', category: 'volume' },
];

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const Modal = styled.div`
    background: #212121;
    border-radius: 8px;
    padding: 24px;
    width: 100%;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    color: white;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: #666;
        border-radius: 4px;
    }
`;

const Title = styled.h2`
    font-size: 20px;
    font-weight: 500;
    margin: 0 0 24px 0;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Section = styled.div`
    margin-bottom: 24px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const CategoryTitle = styled.h3`
    font-size: 16px;
    font-weight: 500;
    margin: 0 0 12px 0;
    color: rgba(255, 255, 255, 0.9);
`;

const ShortcutRow = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 0;
`;

const KeyWrapper = styled.span`
    background: rgba(255, 255, 255, 0.1);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 14px;
    min-width: 80px;
    text-align: center;
    margin-right: 16px;
    font-family: monospace;
`;

const Description = styled.span`
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
`;

const KeyboardShortcutsModal = ({ isOpen, onClose }: Props) => {
    if (!isOpen) return null;

    const shortcutsByCategory = shortcuts.reduce((acc, shortcut) => {
        if (!acc[shortcut.category]) {
            acc[shortcut.category] = [];
        }
        acc[shortcut.category].push(shortcut);
        return acc;
    }, {} as Record<string, ShortcutInfo[]>);

    return (
        <Overlay onClick={onClose}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <Title>키보드 단축키</Title>
                {Object.entries(shortcutsByCategory).map(([category, shortcuts]) => (
                    <Section key={category}>
                        <CategoryTitle>
                            {category === 'playback' && '재생'}
                            {category === 'navigation' && '탐색'}
                            {category === 'volume' && '볼륨'}
                            {category === 'other' && '기타'}
                        </CategoryTitle>
                        {shortcuts.map((shortcut) => (
                            <ShortcutRow key={shortcut.key}>
                                <KeyWrapper>{shortcut.key}</KeyWrapper>
                                <Description>{shortcut.description}</Description>
                            </ShortcutRow>
                        ))}
                    </Section>
                ))}
            </Modal>
        </Overlay>
    );
};

export default KeyboardShortcutsModal;