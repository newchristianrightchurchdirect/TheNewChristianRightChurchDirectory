# Sacred Harp 1991 repairs, transcribed from the sheet JPEGs (OCR of public/hymnal-media/sh-sheet/<n>.1.jpg,
# image-checked where OCR was ambiguous). Each value: (title/firstLine, [stanzas]); stanza lines joined by \n.
FIX = {}
def add(n, first, *stanzas, title=None):
    # A stanza starting 'CHORUS:' is stored with isChorus=True, where it sits in the list.
    FIX[n] = dict(title=title or first, firstLine=first, verses=[
        {'isChorus': s.startswith('CHORUS:'), 'text': s.replace('CHORUS:', '', 1).strip(chr(10))} for s in stanzas])

add('411', 'Come, let us raise our voices high',
"""Come, let us raise our voices high,
And form a sacred song,
To Him who rules the earth and sky,
And does our days prolong.
Who thru the night gave us to rest,
This morning cheered our eyes;
And with the thousands of the blest,
In health made us to rise.""",
"""Early to God we'll send our prayer,
Make haste to pray and praise,
That He may make our good His care,
And guide us all our days.
And when the night of death comes on,
And we shall end our days;
May His rich grace the theme prolong,
Of His eternal praise.""")

add('372', 'My soul, be on thy guard',
"""My soul, be on thy guard,
Ten thousand foes arise;
The hosts of sin are pressing hard
To draw thee from the skies.
O watch and fight and pray;
The battle ne'er give o'er;
Renew it boldly every day,
And help divine implore.""",
"""Ne'er think the vict'ry won,
Nor lay thine armor down;
Thy arduous work will not be done
Till thou obtain thy crown.
Fight on, my soul, till death
Shall bring thee to thy God;
He'll take thee, at thy parting breath,
To His divine abode.""")

add('531', 'Dear Lord, forgive my sins, I pray',
"""Dear Lord, forgive my sins, I pray,
And lead me in the narrow way,
O Lord, give me strength day by day.
Have mercy, Lord, for this I pray.""")

add('384', 'Oh, when will the period appear',
"""Oh, when will the period appear,
When I shall unite in your song?
I'm weary of lingering here,
And I to your Savior belong.
I'm fettered and chained up in clay,
I struggle and pant to be free;
I long to be soaring away,
My God and my Savior to see.""")

add('521', 'Our cheerful voices let us raise',
"""Our cheerful voices let us raise,
And sing a parting song;
Although I'm with you now, my friends,
I can't be with you long.
For I must go and leave you all;
It fills my heart with pain;
Although we part, perhaps in tears,
I hope we'll meet again.""")

add('432', "Grace, 'tis a most delightful theme",
"""Grace, 'tis a most delightful theme,
'Tis grace that rescues guilty man,
'Tis grace divine, all conquering, free,
Or it had never rescued me.""")

add('311', 'Come, sound His praise abroad',
"""Come, sound His praise abroad,
And hymns of glory sing;
Jehovah is the sov'reign Lord,
The universal King.
Hallelujah, hallelujah, hallelujah,
Hallelujah, hallelujah, Praise ye the Lord!""")

# 358 runs onto page 359 ("Murillo's Lesson. Concluded."); both pages read.
add('358', "As down a lone valley with cedars o'erspread",
"""As down a lone valley with cedars o'erspread,
From war's dread confusion I pensively strayed,
The gloom from the face of fair heaven retired;
The winds hushed their murmurs, the thunders expired;
Perfumes as of Eden flowed sweetly along,
A voice as of angels enchantingly sung,
Columbia, Columbia, to glory arise,
The queen of the world and the child of the skies!""",
"""Fair science her gate to thy sons shall unbar,
And the east see thy morn hide the beams of her star;
New bards and new sages unrivaled shall soar
To fame unextinguished when time is no more;
To thee, the last refuge of virtue designed,
Shall fly from all nations the best of mankind;
There grateful to heaven, with transport shall bring
To Jesus, the Author of nations, will sing.""")

add('404', 'Youth, like the spring, will soon be gone',
"""Youth, like the spring, will soon be gone,
By fleeting Time or conqu'ring Death,
Your morning sun may set at noon,
And leave you ever in the dark.
Your sparkling eyes and glowing cheeks,
Must wither like the blasted rose.
The coffin, earth and winding sheet,
Will soon your active limbs enclose.""",
"""Ye heedless ones that wildly stroll,
The grave will soon become your bed,
Where silence reigns and vapors roll
In solemn darkness 'round your head.
Your friends will pass the lonesome place,
And with a sigh move slowly on.
Still gazing on the spires of grass,
With which your graves are overgrown.""",
"""Ye blooming youth, this is the state
Of all who do free grace refuse,
And soon with you 'twill be too late
The way of life and Christ to choose.
Come, lay your carnal weapons by,
No longer fight against your God;
But with the gospel now comply,
And heav'n shall be your great reward.""")

# 158: the book abridges Heber ("But wide arms", "But sunshine") — transcribed as printed.
add('158', 'Thou art gone to the grave, but we will not deplore thee',
"""Thou art gone to the grave, but we will not deplore thee,
Tho' sorrows and darkness encompass the tomb;
The Savior has passed thro' its portals before thee,
And the lamp of His love is thy guide thro' the gloom.""",
"""Thou art gone to the grave, we no longer behold thee,
Nor tread the rough paths of the world by thy side;
But wide arms of mercy are spread to enfold thee,
And all sinners may hope, since the Savior hath died.""",
"""Thou art gone to the grave, and thy cradle's forsaken,
With us thy fond spirit did not tarry long,
But sunshine of heaven beamed bright on thy waking,
And the sound thou didst hear was the seraphim's song.""",
"""Thou art gone to the grave, but 'twere wrong to deplore thee,
When God was thy ransom, and guardian and guide;
He gave thee, and took thee, and soon will restore thee,
Where death hath no sting, since the Savior hath died.""")

# 292: the book prints "death's anxious chain" (Wesley wrote "envious") — kept as printed.
add('292', 'Behold the Savior of mankind',
"""Behold the Savior of mankind
Nailed to the shameful tree!
How vast the love that Him inclined
To bleed and die for thee!
Hark, how He groans! while nature shakes,
And earth's strong pillars bend!
The temple's veil in sunder breaks,
The solid marbles rend.""",
"""'Tis done! the precious ransom's paid!
Receive my soul, He cries:
See where He bows His sacred head!
He bows His head and dies.
But soon He'll break death's anxious chain,
And in full glory shine!
O Lamb of God, was ever pain,
Was ever love like Thine?""")

# 295: ODEM (First), lower half of the page (upper half is ROCKY ROAD concluded).
add('295', "Let ev'ry mortal ear attend",
"""Let ev'ry mortal ear attend,
And ev'ry heart rejoice;
The trumpet of the Gospel sounds,
With an inviting voice.""",
"""Eternal wisdom has prepared
A soul-reviving feast;
And bids your longing appetites
The rich provisions taste.""",
"""Ho! ye that pant for living streams,
And pine away and die;
Here you may quench your raging thirst
With springs that never dry.""")

add('170', 'Oh! may I worthy prove to see',
"""Oh! may I worthy prove to see
The saints in full prosperity,
Then my troubles will be over.
To see the bride, the glitt'ring bride,
Close seated by my Savior's side.
Then my troubles will be over.""",
"""CHORUS:I never shall forget the day
When Jesus washed my sins away,
And then my troubles will be over,
Will be over, will be over,
And rejoicing,
And then my troubles will be over.""",
"""I'll praise Him while He gives me breath,
I hope to praise Him after death.
Then my troubles will be over.
I hope to praise Him when I die,
And shout salvation as I fly!
Then my troubles will be over.""",
"""I soon shall pass the vale of death,
And in His arms resign my breath,
Then my troubles will be over.
O then my happy soul shall tell
My Jesus has done all things well,
Then my troubles will be over.""")

add('167', 'Pray, brethren, pray, the prayer of faith availeth',
"""Pray, brethren, pray, the prayer of faith availeth;
Pray, brethren, pray, on God your spirit stay.""",
"""CHORUS:A few more days of sorrow, and the Lord will call us home,
To walk the golden streets of the new Jerusalem.""",
"""Sing, brethren, sing, rejoice with joy and gladness;
Sing, brethren, sing, your songs of triumph bring.""",
"""Rise, brethren, rise, your souls by faith ascending;
Rise, brethren, rise, your home is in the skies.""")

add('498', 'Oh, Resurrection Day!',
"""Oh, Resurrection Day!
When Christ the Savior comes some morning fair,
The grave will open wide
And saints will rise to meet Him in the air.
Oh! May we meet in Heav'n
To sing the praises of our Lord and King.""")

# 302: LOGAN runs onto page 303 ("Logan. Concluded."); the second section is one shared text.
add('302', 'The day is past and gone',
"""The day is past and gone,
The evening shades appear;
O may we all remember well
The night of death draws near;""",
"""Lord, keep us safe this night,
Secure from all our fears;
May angels guard us while we sleep,
Till morning light appears;""",
"""CHORUS:And when our days are past,
And we from time remove,
O may we in Thy bosom rest,
The bosom of Thy love,
So death will soon disrobe us all
Of what we here possess.""")

add('340', 'Wonderful things of men are said',
"""Wonderful things of men are said
When they have passed away;
Flowers adorn the narrow bed
Over the lifeless clay.""",
"""CHORUS:Give me the roses while I live,
Something to cheer me on;
Useless the flowers you may give
After the soul is gone.""",
"""Life is the time for words of praise,
Hands clasp with friendly smile,
Blessings to cheer a pilgrim's days,
Are always well worthwhile.""")

add('328', 'Oh, for a heart to praise my God',
"""Oh, for a heart to praise my God,
A heart from sin set free;
A heart that's sprinkled with His blood,
So freely shed for me.
Oh, for a heart submissive, meek,
My great Redeemer's throne;
Where only Christ is heard to speak,
Where Jesus reigns alone.""",
"""Oh, for an humble, contrite heart,
Believing, true and clean,
Which neither life nor death can part
From Him that dwells within.
A heart in ev'ry thought renewed,
And full of love divine;
Perfect, and right, and pure, and good,
A copy, Lord, of Thine.""")
