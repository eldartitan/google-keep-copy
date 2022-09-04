/** @format */

import React, { createContext, FC, ReactNode, useContext, useState } from "react";

interface Props {
  children?: ReactNode
}

export interface Ilabel {
  text: string;
  id: number;
}

export type LabelContextType = {
  labels: Ilabel[];
  setLabel: (id: number, text: string) => void;
  deleteLabel: (id: number) => void;
  editLabel: (id: number, text: string) => void;

};

export const LabelContext = createContext<LabelContextType | null>(null);

export const useLabelContext = () => {
  return useContext(LabelContext);
};

export const LabelContextProvider: FC<Props> = ({ children }) => {
  const [labels, setLabelText] = useState<Ilabel[]>([]);

  const setLabel = (id: number, text: string) => {
    if (!labels.filter(label => label.text === text).length) {
      setLabelText([...labels, {id: Math.random(), text}]);
    }
  };

  const editLabel = (id: number, text: string) => {
    labels.filter((label: Ilabel) => {
      if (label.id === id) {
        label.text = text;
        setLabelText([...labels]);
      }
    });
  };

  const deleteLabel = (id: number) => {
    setLabelText(labels.filter((label: Ilabel) => label.id !== id));
  };

  return (
    <LabelContext.Provider
      value={{
        labels,
        setLabel,
        deleteLabel,
        editLabel,
      }}
    >
      {children}
    </LabelContext.Provider>
  );
};
