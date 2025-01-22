// @ts-check

import React, { useState } from 'react';
import {AccountShortEntry} from '../../common-components/account-short-entry';
import { FormatTimestamp } from '../../common-components/format-timestamp';
 
import {useResolveDidToProfile} from '../../api/resolve-handle-or-did';
import { useSearchParams } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';
import { Button, CircularProgress } from '@mui/material'; 


import { localise, localiseNumberSuffix } from '../../localisation';
import { SearchHeaderDebounced } from '../history/search-header';
import { useAccountResolver } from '../account-resolver';
import "./list-packs.css"

/**
 * @param {{
*  className?: string,
*  packs?: PackListEntry[]
* }}_
*/
export function PackView({packs, className=""}){ 
  return (
    <ul className={"packs-as-pack-view "+ (className || '')}>
      {packs && packs?.length>0 &&  packs.map( (pack,i)=> 
        <PackViewEntry key={i} entry={pack} />
       )}
    </ul>

  );

  /**
   * @param {{
  *  className?: string,
  *  entry: PackListEntry
  * }} _
  */
  function PackViewEntry({className="", entry}){ 

    const originator = useResolveDidToProfile(entry.did);
    return(
      <li className={'pack-entry ' + (className || '')}>
      <div className='row'>
      <img src={originator.data?.avatarUrl} className='account-short-entry-avatar'/>
       <span className='pack-name'>
          <a href={entry.url??""} target='__blank'>
          {entry.name}
          </a>
        </span>
        <FormatTimestamp
          timestamp={entry.created_date ?? ""}
          noTooltip
          className='pack-add-date' />
      </div>
      <div className='row'>      
        
        <span className='pack-description'>
          {entry.description && ' ' + entry.description}
        </span>
      </div>
    </li>
    );
  }

    /*

    if (isLoading) {
        return (
          <div style={{ padding: '1em', textAlign: 'center', opacity: '0.5' }}>
            <CircularProgress size="1.5em" /> 
            <div style={{ marginTop: '0.5em' }}>
              {localise('Loading lists...', { uk: 'Завантаження списків...' })}
            </div>
          </div>
        );
      } 
    return (
        <>
            <div>
                Packs created
            </div>            
        </>

    );
    */
}
