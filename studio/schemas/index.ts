import { documentTypes } from "./documents";
import { objectTypes } from "./objects";
import { sectionTypes } from "./sections";

export const schemaTypes = [...objectTypes, ...sectionTypes, ...documentTypes];
