import { useToast } from '@chakra-ui/react';

export function useCopyToClipboard() {
    const toast = useToast();
    copyText.select();
    copyText.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(copyText.value);
}
