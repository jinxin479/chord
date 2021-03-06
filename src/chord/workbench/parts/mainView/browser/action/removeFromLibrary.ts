'use strict';

import { ISong } from 'chord/music/api/song';
import { IArtist } from 'chord/music/api/artist';
import { IAlbum } from 'chord/music/api/album';
import { ICollection } from 'chord/music/api/collection';
import { IUserProfile } from 'chord/music/api/user';

import { IRemoveFromLibraryAct } from 'chord/workbench/api/common/action/mainView';

import { defaultLibrary } from 'chord/library/core/library';

// TODO: check synchronal result
import { syncRemove } from 'chord/workbench/parts/mainView/browser/action/plugins/syncAddRemove';


export function handleRemoveFromLibrary(item: ISong | IArtist | IAlbum | ICollection | IUserProfile): IRemoveFromLibraryAct {
    item.like = false;

    switch (item.type) {
        case 'song':
            defaultLibrary.deleteSong(<ISong>item);
            break;
        case 'artist':
            defaultLibrary.deleteArtist(<IArtist>item);
            break;
        case 'album':
            defaultLibrary.deleteAlbum(<IAlbum>item);
            break;
        case 'collection':
            defaultLibrary.deleteCollection(<ICollection>item);
            break;
        case 'userProfile':
            defaultLibrary.deleteUserProfile(<IUserProfile>item);
            break;
        default:
            console.warn('`handleRemoveFromLibrary` act: unknown item\'s type: ' + JSON.stringify(item));
    }

    syncRemove(item);

    return {
        type: 'c:mainView:removeFromLibrary',
        act: 'c:mainView:removeFromLibrary',
        item,
    };
}
