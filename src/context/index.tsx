/** @format */

import React, { createContext, FC, ReactNode, useContext, useState } from "react";
import { Ilabel } from "./LabelContext";

interface Props {
  children?: ReactNode
}

export interface IKeep {
  id: number;
  title: string;
  description: string;
  status: boolean;
  inTrash: boolean,
  inArchive: boolean,
  reminder: Date | null;
  labels: Ilabel[];
}

export type KeepContextType = {
  keeps: IKeep[];
  saveKeep: (keep: IKeep) => void;
  editKeep: (id: number, description?: string, title?: string) => void;
  visibleKeep: (id: number, status: boolean) => void;
  deleteKeep: (id: number) => void;
  inTrashKeep: (id: number,  intrash: boolean) => void;
  inArchiveKeep: (id: number, inArchive: boolean) => void;
  cleanTrash: () => void;
  setReminder: (id: number, reminder: Date | null) => void;
  setLabel: (id: number, label: Ilabel) => void;
  deleteLabel: (id: number, label: Ilabel) => void;
};

export const KeepContext = createContext<KeepContextType | null>(null);

export const useKeepContext = () => {
  return useContext(KeepContext);
};

export const KeepContextProvider: FC<Props> = ({ children }) => {
  const [keeps, setKeeps] = useState<IKeep[]>([]);

  const saveKeep = (keep: IKeep) => {
    const newTodo: IKeep = {
      id: Math.random(),
      title: keep.title,
      description: keep.description,
      status: false,
      inTrash: false,
      inArchive: false,
      reminder: null,
      labels: [],
    };
    setKeeps([...keeps, newTodo]);
  };
  
  const setLabel = (id: number,  label: Ilabel) => {
    keeps.filter((keep: IKeep) => {
      if (keep.id === id && !keep.labels.includes(label)) {
        keep.labels.push(label);
        setKeeps([...keeps]);
      }
    });
  }

  const deleteLabel = (id: number,  label: Ilabel) => {
    let newKeeps = keeps.map((keep: IKeep) => {
      if (keep.id === id) {
        keep.labels = keep.labels.filter(l => l.id !== label.id);
        return keep
      }
      return keep;
    })
    setKeeps(newKeeps);
  }

  const setReminder = (id: number,  reminder: Date | null) => {
    keeps.filter((keep: IKeep) => {
      if (keep.id === id) {
        keep.reminder = reminder;
        setKeeps([...keeps]);
      }
    });
  }

  const cleanTrash = () => {
    setKeeps(keeps.filter((keep: IKeep) => !keep.inTrash))
  }

  const inTrashKeep = (id: number,  inTrash: boolean) => {
    keeps.filter((keep: IKeep) => {
      if (keep.id === id) {
        keep.inTrash = inTrash;
        setKeeps([...keeps]);
      }
    });
  };

  const inArchiveKeep = (id: number, inArchive: boolean) => {
    keeps.filter((keep: IKeep) => {
      if (keep.id === id) {
        keep.inArchive = inArchive;
        setKeeps([...keeps]);
      }
    });
  };

  const deleteKeep = (id: number) => {
    setKeeps(keeps.filter((keep: IKeep) => keep.id !== id));
  };

  const editKeep = (id: number, description?: string, title?: string) => {
    keeps.filter((keep: IKeep) => {
      if (keep.id === id) {
        keep.description = description || keep.description;
        keep.title = title || keep.title;
        setKeeps([...keeps]);
      }
    });
  };
  
  const visibleKeep = (id: number, status: boolean) => {
    keeps.filter((keep: IKeep) => {
      if (keep.id === id) {
        keep.status = status;
        setKeeps([...keeps]);
      }
    });
  };

  return (
    <KeepContext.Provider
      value={{
        keeps,
        saveKeep,
        editKeep,
        visibleKeep,
        deleteKeep,
        inTrashKeep,
        inArchiveKeep,
        cleanTrash,
        setReminder,
        setLabel,
        deleteLabel
      }}
    >
      {children}
    </KeepContext.Provider>
  );
};
