declare module '@react-pdf/renderer' {
  import { ComponentType, ReactElement, ReactNode } from 'react';

  export interface DocumentProps {
    children?: ReactNode;
  }

  export interface PageProps {
    size?: string;
    style?: any;
    children?: ReactNode;
  }

  export interface ViewProps {
    style?: any;
    children?: ReactNode;
  }

  export interface TextProps {
    style?: any;
    children?: ReactNode;
  }

  export interface PDFDownloadLinkProps {
    document: ReactElement;
    fileName: string;
    children: (props: {
      blob: Blob | null;
      url: string | null;
      loading: boolean;
      error: Error | null;
    }) => ReactNode;
  }

  export const Document: ComponentType<DocumentProps>;
  export const Page: ComponentType<PageProps>;
  export const View: ComponentType<ViewProps>;
  export const Text: ComponentType<TextProps>;
  export const PDFDownloadLink: ComponentType<PDFDownloadLinkProps>;
  export const StyleSheet: {
    create: <T extends { [key: string]: any }>(styles: T) => T;
  };
} 