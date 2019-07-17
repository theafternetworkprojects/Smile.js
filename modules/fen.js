/*
BSD 3-Clause License

Copyright (c) 2019, smileycreations15 (me@smileycreations15.com)
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
const matchFullFEN = /^\s*([prnbqkPRNBQK12345678]{1,8}(?:\/[prnbqkPRNBQK12345678]{1,8}){7})\s+(w|b)\s+([KQkqA-Ha-h]{1,4}|\-)\s+(?:(?:([a-h][36]|\-)\s+(\d{1,3})\s+(\d{1,4}))|(?:0\s+0))\s*$/;
const fenExpand = /[1-8]+/g;
const fenPack = /\-+/g;
const fenSubst = { 1: '-', 2: '--', 3: '---', 4: '----', 5: '-----', 6: '------', 7: '-------', 8: '--------' };
/**
 * Class FenParser - see readme for more information
 */
module.exports = class FenParser {
    /**
     * @constructor {FenParser}
     * @param {string} value a chess FEN string
     * @description Constructs a parsed FEN, check isValid property for success
     */
    constructor(value) {
        /** The original string the object was constructed from */
        this.original = '';
        /** true if the FEN provided to the constructor was validated and represented the full 8x8 board. */
        this.isValid = false;
        /** Gets the encoded version of the ranks, use the ranks property to modify. */
        this.positions = '';
        /** Gets or sets the unencoded rank & file position of pieces using a dash `'-'` for an empty square. */
        this.ranks = [];
        /** Gets or sets the color of the player who should make the next move. */
        this.turn = '';
        /** Gets or sets the valid sides (`kqKQ`) or files (`abcdefghABCDEFGH`) valid for castling. */
        this.castles = '';
        /** Gets or sets the currently possible en passant square in file+rank notation, or `-` for none. */
        this.enpass = '';
        /** Gets or sets the number of halfmoves since the last capture or pawn advance. */
        this.halfmoveClock = 0;
        /** Gets or sets the number of the full move. It starts at 1, and is incremented after Black's move. */
        this.moveNumber = 0;
        this.original = (typeof value === 'string') ? value : '';
        const match = this.original.match(matchFullFEN);
        this.isValid = !!match;
        if (match) {
            this.positions = match[1];
            this.ranks = match[1].split('/').map(s => s.replace(fenExpand, i => fenSubst[i]));
            this.turn = match[2];
            this.castles = match[3];
            this.enpass = match[4] !== undefined ? match[4] : '-';
            this.halfmoveClock = match[5] !== undefined ? parseInt(match[5], 10) : 0;
            this.moveNumber = match[6] !== undefined ? parseInt(match[6], 10) : 1;
            this.isValid = this.ranks.reduce((before, rank) => before && rank.length === 8, true);
        }
    }
    /**
     * Returns the properties of this as a FEN (does not valid).
     * @returns {string} The reconstructed FEN string
     */
    toString() {
        const positions = this.ranks.map(rank => rank.replace(fenPack, m => m.length.toString())).join('/');
        return `${positions} ${this.turn} ${this.castles} ${this.enpass} ${this.halfmoveClock} ${this.moveNumber}`;
    }
    /**
     * Checks to see if a piece exists in the FEN string.
     * @param {string} piece Any valid chess piece 'prnbqk' for black or upper-case for white.
     * @returns {boolean} true if found, otherwise false.
     */
    hasPiece(piece) {
        return this.positions.indexOf(piece) >= 0;
    }
    /**
     * Returns a map of each piece type encountered to the count of occurrences
     * @returns {{string: number}} an object map for {[piece]: count}
     */
    counts() {
        const counts = {};
        for (const rank of this.ranks) {
            for (const ch of rank) {
                if (ch !== '-') {
                    counts[ch] = (counts[ch] || 0) + 1;
                }
            }
        }
        return counts;
    }
}
/**
 * @static
 * @param {string} text
 * @returns {boolean} true if valid.
 * @description Returns true if the provided argument 'appears' to be a valid chess FEN
 */
module.exports.isFen = (text) => (typeof text === 'string' && matchFullFEN.test(text));
