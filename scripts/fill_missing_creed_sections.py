import json, shutil, time

path = r'C:/Users/Dustina/Websites/church-directory/public/hymnal-data/confessions.json'
shutil.copy(path, path + f'.bak-{int(time.time())}')

with open(path, encoding='utf-8') as f:
    data = json.load(f)

# ---- Chicago Statement Preface (5 paragraphs) ----
chicago_preface = [
    (
        "p1", "The Authority of Scripture",
        "The authority of Scripture is a key issue for the Christian church "
        "in this and every age. Those who profess faith in Jesus Christ as "
        "Lord and Savior are called to show the reality of their discipleship "
        "by humbly and faithfully obeying God\u2019s written Word. To stray "
        "from Scripture in faith or conduct is disloyalty to our Master. "
        "Recognition of the total truth and trustworthiness of Holy Scripture "
        "is essential to a full grasp and adequate confession of its authority."
    ),
    (
        "p2", "Affirming Inerrancy",
        "The following Statement affirms this inerrancy of Scripture afresh, "
        "making clear our understanding of it and warning against its denial. "
        "We are persuaded that to deny it is to set aside the witness of "
        "Jesus Christ and of the Holy Spirit and to refuse that submission "
        "to the claims of God\u2019s own Word which marks true Christian "
        "faith. We see it as our timely duty to make this affirmation in "
        "the face of current lapses from the truth of inerrancy among our "
        "fellow Christians and misunderstandings of this doctrine in the "
        "world at large."
    ),
    (
        "p3", "Form and Scope of the Statement",
        "This Statement consists of three parts: a Summary Statement, "
        "Articles of Affirmation and Denial, and an accompanying Exposition. "
        "It has been prepared in the course of a three-day consultation in "
        "Chicago. Those who have signed the Summary Statement and the "
        "Articles wish to affirm their own conviction as to the inerrancy "
        "of Scripture and to encourage and challenge one another and all "
        "Christians to growing appreciation and understanding of this "
        "doctrine. We acknowledge the limitations of a document prepared "
        "in a brief, intensive conference and do not propose that this "
        "Statement be given creedal weight. Yet we rejoice in the deepening "
        "of our own convictions through our discussions together, and we "
        "pray that the Statement we have signed may be used to the glory "
        "of our God toward a new reformation of the Church in its faith, "
        "life, and mission."
    ),
    (
        "p4", "Spirit of the Statement",
        "We offer this Statement in a spirit, not of contention, but of "
        "humility and love, which we purpose by God\u2019s grace to maintain "
        "in any future dialogue arising out of what we have said. We gladly "
        "acknowledge that many who deny the inerrancy of Scripture do not "
        "display the consequences of this denial in the rest of their belief "
        "and behavior, and we are conscious that we who confess this "
        "doctrine often deny it in life by failing to bring our thoughts "
        "and deeds, our traditions and habits, into true subjection to the "
        "divine Word."
    ),
    (
        "p5", "Invitation to Response",
        "We invite response to this statement from any who see reason to "
        "amend its affirmations about Scripture by the light of Scripture "
        "itself, under whose infallible authority we stand as we speak. "
        "We claim no personal infallibility for the witness we bear, and "
        "for any help which enables us to strengthen this testimony to "
        "God\u2019s Word we shall be grateful.\n\n\u2014 The Draft Committee"
    ),
]

# ---- Nashville Statement Preamble (4 paragraphs) ----
nashville_preamble = [
    (
        "p1", "A Period of Historic Transition",
        "Evangelical Christians at the dawn of the twenty-first century "
        "find themselves living in a period of historic transition. As "
        "Western culture has become increasingly post-Christian, it has "
        "embarked upon a massive revision of what it means to be a human "
        "being. By and large, the spirit of our age no longer discerns or "
        "delights in the beauty of God\u2019s design for human life. Many "
        "deny that God created human beings for His glory and that His "
        "good purposes for us include our personal and physical design as "
        "male and female. It is common to think that human identity as "
        "male and female is not part of God\u2019s beautiful plan but is, "
        "rather, an expression of an individual\u2019s autonomous "
        "preferences. The pathway to full and lasting joy through "
        "God\u2019s good design for His creatures is thus replaced by the "
        "path of shortsighted alternatives that, sooner or later, ruin "
        "human life and dishonor God."
    ),
    (
        "p2", "A Challenge to the Church",
        "This secular spirit of our age presents a great challenge to the "
        "Christian church. Will the church of the Lord Jesus Christ lose "
        "her biblical conviction, clarity, and courage, and blend into the "
        "spirit of the age? Or will she hold fast to the word of life, "
        "draw courage from Jesus, and unashamedly proclaim His way as the "
        "way of life? Will she maintain her clear, counter-cultural witness "
        "to a world that seems bent on ruin?"
    ),
    (
        "p3", "Faithfulness Means Telling the True Story",
        "We are persuaded that faithfulness in our generation means "
        "declaring once again the true story of the world and of our place "
        "in it\u2014particularly as male and female. Christian Scripture "
        "teaches that there is but one God who alone is Creator and Lord "
        "of all. To Him alone, every person owes glad-hearted thanksgiving, "
        "heartfelt praise, and total allegiance. This is the path not only "
        "of glorifying God but of knowing ourselves. To forget our Creator "
        "is to forget who we are, for He made us for Himself. And we "
        "cannot know ourselves truly without truly knowing Him who made "
        "us. We did not make ourselves. We are not our own. Our true "
        "identity, as male and female persons, is given by God. It is not "
        "only foolish but hopeless to try to make ourselves what God did "
        "not create us to be."
    ),
    (
        "p4", "Offered for the Good of the Church",
        "We believe that God\u2019s design for His creation and His way "
        "of salvation serve to bring Him the greatest glory and bring us "
        "the greatest good. God\u2019s good plan provides us with the "
        "greatest freedom. Jesus said He came that we might have life and "
        "have it in overflowing measure. He is for us and not against us. "
        "Therefore, in the hope of serving Christ\u2019s church and "
        "witnessing publicly to the good purposes of God for human "
        "sexuality revealed in Christian Scripture, we offer the following "
        "affirmations and denials."
    ),
]

def to_entries(label_prefix, items):
    out = []
    for slug, q, a in items:
        out.append({
            "id": f"{label_prefix}-{slug}",
            "label": f"\u00B6 {slug[1:]}",
            "question": q,
            "answer": a,
            "proofs": [],
        })
    return out

chicago_entries = to_entries("chicago-preface", chicago_preface)
nashville_entries = to_entries("nashville-preamble", nashville_preamble)

for d in data['documents']:
    if d['id'] == 'chicago-statement':
        for g in d.get('groups', []):
            if (g.get('title') or '').strip().lower() == 'preface':
                g['entries'] = chicago_entries
                print('Filled Chicago Preface with', len(chicago_entries), 'entries.')
                break
    if d['id'] == 'nashville-statement':
        for g in d.get('groups', []):
            if (g.get('title') or '').strip().lower() == 'preamble':
                g['entries'] = nashville_entries
                print('Filled Nashville Preamble with', len(nashville_entries), 'entries.')
                break

with open(path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
print('Wrote', path)
