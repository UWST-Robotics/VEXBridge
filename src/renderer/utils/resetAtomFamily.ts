import {AtomFamily} from "jotai/vanilla/utils/atomFamily";

export default function resetAtomFamily<TInput, TOutput>(
    atomFamily: AtomFamily<TInput, TOutput>
) {
    for (const param of atomFamily.getParams())
        atomFamily.remove(param);
}